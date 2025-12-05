import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['link', 'blockquote', 'code-block'],
  ['clean'],
];

const RichTextEditor = ({ label, value = '', onChange, placeholder = '' }) => {
  const containerRef = useRef(null);
  const quillRef = useRef(null);

  // initialize editor once
  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    quillRef.current = new Quill(containerRef.current, {
      theme: 'snow',
      modules: { toolbar: toolbarOptions },
      placeholder,
    });

    const handler = () => {
      const html = quillRef.current.root.innerHTML;
      onChange?.(html === '<p><br></p>' ? '' : html);
    };

    quillRef.current.on('text-change', handler);

    return () => {
      quillRef.current?.off('text-change', handler);
    };
  }, [onChange, placeholder]);

  // sync value coming from outside
  useEffect(() => {
    if (!quillRef.current) return;
    const current = quillRef.current.root.innerHTML;
    const incoming = value || '';
    if (incoming !== current) {
      quillRef.current.root.innerHTML = incoming;
    }
  }, [value]);

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="bg-white rounded-md border border-gray-300">
        <div ref={containerRef} className="min-h-[200px]" />
      </div>
      <p className="text-xs text-gray-500">
        Bạn có thể định dạng văn bản tương tự như trong Word (in đậm, gạch đầu dòng, chèn liên kết, ...).
      </p>
    </div>
  );
};

export default RichTextEditor;

