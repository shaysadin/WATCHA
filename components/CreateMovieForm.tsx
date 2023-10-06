import React, { useCallback, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineClose } from 'react-icons/ai';
import { ImageUpload } from './ImageUpload';
import toast, { Toaster } from "react-hot-toast";
import VideoUpload from './VideoUpload';


const notifyCommentDelete = () =>
  toast.success("Movie Uploaded successfully!", {
    position: "bottom-center",
  });

interface CreateFormModelProps {
  visible?: boolean;
  onClose: () => void;
}

const CreateMovieForm: React.FC<CreateFormModelProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);


  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);


  if (!visible) {
    return null;
  }
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    videoUrl: Yup.string().required('Video URL is required'),
    thumbnailUrl: Yup.string().required('Thumbnail URL is required'),
    genre: Yup.string().required('Genre is required'),
    duration: Yup.string().required('Duration is required'),
  });

  // Handle form submission
  const handleSubmit = async (values: { [key: string]: string }, { resetForm }: { resetForm: () => void }) => {
    console.log('Submitting form data:', values);
    try {
      // Send a POST request to your backend to create the movie
      // You can use Axios, Fetch, or any other HTTP library
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        notifyCommentDelete();
        // Reset the form on success
        resetForm();
      } else {
        // Handle error case
        console.error('Error creating movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };

  // return (
  //   <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-80 transition duration-300">
  //     <div className="w-full max-w-lg bg-white rounded-lg overflow-hidden shadow-md transform scale-100 transition duration-300">
  //       <div className="relative">
  //         <div onClick={handleClose} className="absolute top-3 right-3 h-10 w-10 bg-black bg-opacity-70 rounded-full flex items-center justify-center cursor-pointer">
  //           <AiOutlineClose className="text-white w-6" />
  //         </div>
  //       </div>
  //       <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-4 mb-8">Create Movie</h2>
  //       <Formik
  //         initialValues={{
  //           title: '',
  //           description: '',
  //           videoUrl: '',
  //           thumbnailUrl: '',
  //           genre: '',
  //           duration: '',
  //         }}
  //         // validationSchema={validationSchema}
  //         onSubmit={handleSubmit}
  //       >
  //         <Form className="px-8 py-6">
  //           <div className="mb-4">
  //             <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
  //               Title
  //             </label>
  //             <Field
  //               type="text"
  //               id="title"
  //               name="title"
  //               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
  //             />

  //             <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
  //               Description
  //             </label>
  //             <Field
  //               type="text"
  //               id="description"
  //               name="description"
  //               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
  //             />
  //             <Field name="thumbnailUrl">
  //               {({ field, form }: any) => (
  //                 <div className="mb-4">
  //                   <label htmlFor="thumbnailUrl" className="block text-gray-700 font-bold mb-2">
  //                     Thumbnail URL
  //                   </label>
  //                   <ImageUpload
  //                     value={field.value} // Pass the field value
  //                     onChange={(imageSrc) => {
  //                       form.setFieldValue('thumbnailUrl', imageSrc); // Set the 'thumbnailUrl' field value
  //                     }}
  //                   />
  //                 </div>
  //               )}
  //             </Field>
  //             <label htmlFor="videoFile" className="block text-gray-700 font-bold mb-2">
  //               Video Upload
  //             </label>
  //             <Field name="videoFile">
  //               {(field: any) => (
  //                 <VideoUpload
  //                 onChange={(videoUrl: string) => {
  //                     // Set the video URL in the form field
  //                     field.form.setFieldValue('videoUrl', videoUrl);
  //                   }}
  //                 />
  //               )}
  //             </Field>
  //             <label htmlFor="genre" className="block text-gray-700 font-bold mb-2">
  //               Genre
  //             </label>
  //             <Field
  //               type="text"
  //               id="genre"
  //               name="genre"
  //               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
  //             />
  //             <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">
  //               Duration
  //             </label>
  //             <Field
  //               type="text"
  //               id="duration"
  //               name="duration"
  //               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
  //             />

  //             <ErrorMessage name="title" component="div" className="text-red-500 mt-2" />
  //           </div>

  //           {/* Repeat similar code for other form fields (description, videoUrl, etc.) */}

  //           <div className="mt-6">
  //             <button
  //               type="submit"
  //               className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
  //             >
  //               Submit
  //             </button>
  //           </div>
  //         </Form>
  //       </Formik>
  //     </div>
  //     <Toaster />
  //   </div>
  // );

  return (
    <div className={`fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-80 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="w-full max-w-lg bg-white rounded-lg overflow-x-hidden overflow-y-auto shadow-md transform scale-100 transition duration-300">
        <div className="relative">
          <div onClick={handleClose} className="absolute top-3 right-3 h-10 w-10 bg-black bg-opacity-70 rounded-full flex items-center justify-center cursor-pointer">
            <AiOutlineClose className="text-white w-6" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-4 mb-8">Create Movie</h2>
        <div className="overflow-y-auto overflow-x-hidden p-4">
        <Formik
          initialValues={{
            title: '',
            description: '',
            videoUrl: '',
            thumbnailUrl: '',
            genre: '',
            duration: '',
          }}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="px-8 py-6 flex flex-wrap">
            <div className="w-full md:w-1/2 px-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
  
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
  
                <Field name="thumbnailUrl">
                  {({ field, form }: any) => (
                    <div className="mb-4">
                      <label htmlFor="thumbnailUrl" className="block text-gray-700 font-bold mb-2">
                        Thumbnail URL
                      </label>
                      <ImageUpload
                        value={field.value} // Pass the field value
                        onChange={(imageSrc) => {
                          form.setFieldValue('thumbnailUrl', imageSrc); // Set the 'thumbnailUrl' field value
                        }}
                      />
                    </div>
                  )}
                </Field>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
                  <label htmlFor="genre" className="block text-gray-700 font-bold mb-2">
                    Genre
                  </label>
                  <Field
                    type="text"
                    id="genre"
                    name="genre"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
      
                  <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">
                    Duration
                  </label>
                  <Field
                    type="text"
                    id="duration"
                    name="duration"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
              <div className="mb-4">
                <label htmlFor="videoFile" className="block text-gray-700 font-bold mb-2">
                  Video Upload
                </label>
                <Field name="videoFile">
                  {(field: any) => (
                    <VideoUpload
                      onChange={(videoUrl: string) => {
                        // Set the video URL in the form field
                        field.form.setFieldValue('videoUrl', videoUrl);
                      }}
                    />
                  )}
                </Field>
              </div>
  
            </div>
            <div className="w-full mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateMovieForm;