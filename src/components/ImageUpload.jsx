import { useRef, useCallback } from 'react';
import { Form, Image } from 'react-bootstrap';

function ImageUpload({ image, onImageChange }) {
  const fileInputRef = useRef(null);

  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onImageChange(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid JPG or PNG image.');
      }
    },
    [onImageChange]
  );

  return (
    <div>
      <div className='mb-3'>
        <h4>Image Preview</h4>
        {image ? (
          <Image src={image} alt='Preview' fluid />
        ) : (
          <div className='text-center p-5 bg-light'>No image selected</div>
        )}
      </div>
      <Form.Group controlId='formFile' className='mb-3'>
        <Form.Label>Upload Image (JPG or PNG)</Form.Label>
        <Form.Control
          type='file'
          onChange={handleImageChange}
          accept='.jpg,.jpeg,.png'
          ref={fileInputRef}
        />
      </Form.Group>
    </div>
  );
}

export default ImageUpload;
