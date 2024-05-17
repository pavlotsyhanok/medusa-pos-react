import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { NotFoundException } from '@zxing/library';
import styles from '../header/Header.module.css'

const formats = [
  '@zxing/library/esm5/core/oned/Code128Reader',
  '@zxing/library/esm5/core/oned/EAN13Reader',
  '@zxing/library/esm5/core/oned/EAN8Reader',
  '@zxing/library/esm5/core/oned/CODE39Reader',
  // Add more supported formats here
];

const Scanner = ({onScan}) => {
  const videoRef = useRef(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const codeReader = new BrowserMultiFormatReader(null, formats);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await codeReader.listVideoInputDevices();
        setVideoDevices(devices);
        setSelectedDeviceId(devices[0]?.deviceId);
      } catch (error) {
        console.error('Error listing video devices:', error);
      }
    };

    getDevices();
  }, []);

  useEffect(() => {
    if (!selectedDeviceId || typeof navigator === 'undefined' || !videoRef.current) {
      return;
    }

    const startVideo = async () => {
      try {
        await codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
          if (result) {
            console.log(result);
            onScan(result.text)
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error(err);
          }
        });
      } catch (error) {
        console.error('Error starting video:', error);
      }
    };

    startVideo();

    return () => {
      codeReader.reset();
    };
  }, [selectedDeviceId]);

  return (
    <div className={styles.scanner}>
        <h1>Video input:</h1>
      <select
        value={selectedDeviceId}
        onChange={(e) => setSelectedDeviceId(e.target.value)}
        style={{ marginBottom: '10px' }}
      >
        {videoDevices.map((device, index) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${index + 1}`}
          </option>
        ))}
      </select>
      <video ref={videoRef} />
    </div>
  );
};

export default Scanner;
