import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [isRecording, setIsRecording] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  // Khởi tạo camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      alert('Không thể truy cập camera: ' + error.message);
    }
  };

  // Dừng camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Chụp ảnh từ camera
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage({
          url: imageUrl,
          blob: blob,
          timestamp: new Date().toLocaleString()
        });
      }, 'image/jpeg', 0.9);
    }
  };

  // Bắt đầu quay video
  const startRecording = () => {
    if (stream) {
      recordedChunks.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideo({
          url: videoUrl,
          blob: blob,
          timestamp: new Date().toLocaleString()
        });
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  // Dừng quay video
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Tải xuống file
  const downloadFile = (fileData, filename, type) => {
    const link = document.createElement('a');
    link.href = fileData.url;
    link.download = `${filename}_${fileData.timestamp.replace(/[/:]/g, '-')}.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          👨‍⚕️ Dashboard Bác sĩ
        </h1>
        <p className="text-green-100">
          Xin chào, {user?.name}! Hệ thống chụp ảnh và quay video y tế
        </p>
      </div>

      {/* Camera Controls */}
      <Card>
        <CardHeader>
          <CardTitle>📹 Điều khiển Camera</CardTitle>
          <CardDescription>
            Chụp ảnh và quay video cho mục đích y tế
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Camera Preview */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                  style={{ display: stream ? 'block' : 'none' }}
                />
                {!stream && (
                  <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-2 text-gray-500">Camera chưa được khởi động</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Control Buttons */}
              <div className="flex flex-wrap gap-2">
                {!stream ? (
                  <Button onClick={startCamera} className="bg-blue-600 hover:bg-blue-700">
                    📹 Khởi động Camera
                  </Button>
                ) : (
                  <Button onClick={stopCamera} variant="outline">
                    ⏹️ Tắt Camera
                  </Button>
                )}
                
                <Button 
                  onClick={capturePhoto} 
                  disabled={!stream}
                  className="bg-green-600 hover:bg-green-700"
                >
                  📸 Chụp ảnh
                </Button>
                
                {!isRecording ? (
                  <Button 
                    onClick={startRecording} 
                    disabled={!stream}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    🎥 Quay video
                  </Button>
                ) : (
                  <Button 
                    onClick={stopRecording}
                    className="bg-orange-600 hover:bg-orange-700 animate-pulse"
                  >
                    ⏹️ Dừng quay
                  </Button>
                )}
              </div>
            </div>

            {/* Results Display */}
            <div className="space-y-4">
              {/* Captured Image */}
              {capturedImage && (
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">📸 Ảnh đã chụp</h3>
                  <img 
                    src={capturedImage.url} 
                    alt="Captured" 
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Thời gian: {capturedImage.timestamp}</span>
                    <Button 
                      size="sm"
                      onClick={() => downloadFile(capturedImage, 'medical_photo', 'jpg')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      💾 Tải xuống
                    </Button>
                  </div>
                </div>
              )}

              {/* Recorded Video */}
              {recordedVideo && (
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">🎥 Video đã quay</h3>
                  <video 
                    src={recordedVideo.url} 
                    controls 
                    className="w-full h-48 rounded mb-2"
                  />
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Thời gian: {recordedVideo.timestamp}</span>
                    <Button 
                      size="sm"
                      onClick={() => downloadFile(recordedVideo, 'medical_video', 'webm')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      💾 Tải xuống
                    </Button>
                  </div>
                </div>
              )}

              {/* Instructions */}
              {!capturedImage && !recordedVideo && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">📋 Hướng dẫn sử dụng</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Nhấn "Khởi động Camera" để bắt đầu</li>
                    <li>• Nhấn "Chụp ảnh" để chụp ảnh từ camera</li>
                    <li>• Nhấn "Quay video" để bắt đầu quay video</li>
                    <li>• Ảnh và video sẽ hiển thị ở đây sau khi hoàn thành</li>
                    <li>• Nhấn "Tải xuống" để lưu file về máy</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
