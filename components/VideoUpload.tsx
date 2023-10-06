import { useEffect, useState } from 'react';
import app from '../lib/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AiOutlineClose } from 'react-icons/ai';

// interface VideoUploadProps {
//   onChange: (videoUrl: string) => void;
//   disabled?: boolean;
// }

// const VideoUpload: React.FC<VideoUploadProps> = ({ onChange, disabled }) => {
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);

//   // Function to handle video file selection
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       setVideoFile(selectedFile);
//     }
//   };

//   // Function to upload the video to Firebase storage
//   const uploadVideo = async () => {
//     if (!videoFile) {
//       return;
//     }

//     setIsUploading(true);

//     // Create a storage reference for the video file
//     const storage = getStorage(app);
//     const storageRef = ref(storage, `videos/${videoFile.name}`);

//     // Create a new upload task
//     const uploadTask = uploadBytesResumable(storageRef, videoFile);

//     try {
//       // Observe state change events (progress, pause, resume)
//       uploadTask.on('state_changed', (snapshot) => {
//         // Handle progress and other state changes
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//       });

//       // When the upload is complete, get the download URL
//       await uploadTask.then(async (snapshot) => {
//         const downloadURL = await getDownloadURL(snapshot.ref);
//         onChange(downloadURL); // Pass the video URL to the parent component
//         setIsUploading(false);
//       });
//     } catch (error) {
//       console.error('Error uploading video:', error);
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept="video/*"
//         onChange={handleFileChange}
//         disabled={disabled || isUploading}
//       />
//       <button
//         onClick={uploadVideo}
//         disabled={!videoFile || isUploading}
//       >
//         Upload Video
//       </button>
//       {isUploading && <p>Uploading...</p>}
//     </div>
//   );
// };

// export default VideoUpload;

interface VideoUploadProps {
    onChange: (videoUrl: string) => void;
    disabled?: boolean;
    initialVideoUrl?: string | null;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onChange, disabled, initialVideoUrl }) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string>(''); // Store the video URL
    const [showRemove, setShowRemove] = useState(false);

    useEffect(() => {
        if (videoFile) {
          const videoName = videoFile.name;
          const storage = getStorage(app);
          const storageRef = ref(storage, `videos/${videoName}`);
          getDownloadURL(storageRef)
            .then((downloadURL) => {
              setVideoUrl(downloadURL);
              setShowRemove(true);
              onChange(downloadURL); // Pass the download URL to the parent component
            })
            .catch(() => {
              // Video with the same name doesn't exist, no need to handle the error
            });
        }
      }, [videoFile, onChange]);
    // Function to handle video file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setVideoFile(selectedFile);
            setShowRemove(false);
        }
    };


    const uploadVideo = async () => {
        if (!videoFile) {
            return;
        }

        setIsUploading(true);

        // Create a storage reference for the video file
        const storage = getStorage(app);
        const storageRef = ref(storage, `videos/${videoFile.name}`);

        // Create a new upload task
        const uploadTask = uploadBytesResumable(storageRef, videoFile);

        try {
            // Observe state change events (progress, pause, resume)
            uploadTask.on('state_changed', (snapshot) => {
                // Handle progress and other state changes
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            });

            // When the upload is complete, get the download URL
            await uploadTask.then(async (snapshot) => {
                const downloadURL = await getDownloadURL(snapshot.ref);
                onChange(downloadURL); // Pass the video URL to the parent component
                setVideoUrl(downloadURL); // Store the video URL
                setIsUploading(false);
                setShowRemove(true); // Show remove button after successful upload
            });
        } catch (error) {
            console.error('Error uploading video:', error);
            setIsUploading(false);
        }
    };

    // Function to remove the uploaded video
    const removeVideo = () => {
        setVideoFile(null);
        setVideoUrl('');
        setShowRemove(false);

        const inputElement = document.getElementById('videoInput') as HTMLInputElement;
        if (inputElement) {
            inputElement.value = '';
        }
    };

    return (
        <div>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            disabled={disabled || isUploading}
            id="videoInput"
          />
          <button
            onClick={uploadVideo}
            disabled={!videoFile || isUploading}
            className={`ml-[100px] md:ml-10 py-2 px-4 rounded-md ${
              !showRemove ? 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-white mt-6' : 'hidden'
            }`}
          >
            Upload Video
          </button>
          {videoUrl && (
            <div className="relative">
              {/* Display the uploaded video */}
              <video controls width="350" height="300" className="mx-auto mt-2">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {showRemove && (
                <button
                  onClick={removeVideo}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full"
                >
                  <AiOutlineClose className="text-black w-6 h-6" />
                </button>
              )}
            </div>
          )}
          {isUploading && <p>Uploading...</p>}
        </div>
      );
};

export default VideoUpload;