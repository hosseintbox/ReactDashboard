import React, { useState } from "react";

interface ImageUploaderProps {
  name: string;
  label?: string;
  onChange?: (name: string, files: FileList) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ name, label = "آپلود فایل", onChange }) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const imagePreviews = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviews(imagePreviews);
      if (onChange) onChange(name, files);
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 my-3 ">{label}</label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M7 16V4a4 4 0 018 0v12m1 4H6a2 2 0 01-2-2V8a2 2 0 012-2h2l2-2h4l2 2h2a2 2 0 012 2v10a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 text-center">
              <span className="font-semibold">فایلی را انتخاب کنید</span> یا آن را بکشید
            </p>
          </div>
          <input type="file" name={name} className="hidden" multiple onChange={handleChange} accept="image/*" />
        </label>
      </div>

      {/* پیش‌نمایش تصاویر انتخاب‌شده */}
      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {previews.map((src, idx) => (
            <img key={idx} src={src} className="w-full h-24 object-cover rounded" alt={`preview-${idx}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
