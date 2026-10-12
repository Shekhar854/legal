'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Bold,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileText,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Paperclip,
  Pilcrow,
  Quote,
  Send,
  Trash2,
  Type,
  Upload,
  Video,
  X,
} from 'lucide-react';

interface BlogEditorTabProps {
  onPublishSuccess: (slug: string) => void;
  pubSuccess: string | null;
  onClearSuccess: () => void;
}

export default function BlogEditorTab({ onPublishSuccess, pubSuccess, onClearSuccess }: BlogEditorTabProps) {
  // Form fields
  const [title, setTitle] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [category, setCategory] = useState('Consumer Rights');
  const [tags, setTags] = useState('Legal Guide, Rights, 2026');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // Editor state
  const [showPreview, setShowPreview] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  // Upload a file and return the URL
  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Upload failed');
        return null;
      }
      return data.url;
    } catch (err) {
      alert('Upload failed. Please try again.');
      return null;
    }
  }, []);

  // Insert text at cursor position in textarea
  const insertAtCursor = useCallback((text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.substring(0, start);
    const after = content.substring(end);

    const newContent = before + text + after;
    setContent(newContent);

    // Restore cursor position after the inserted text
    requestAnimationFrame(() => {
      textarea.focus();
      const newPos = start + text.length;
      textarea.setSelectionRange(newPos, newPos);
    });
  }, [content]);

  // Wrap selected text with formatting
  const wrapSelection = useCallback((prefix: string, suffix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const before = content.substring(0, start);
    const after = content.substring(end);

    const newContent = before + prefix + (selected || 'text') + suffix + after;
    setContent(newContent);

    requestAnimationFrame(() => {
      textarea.focus();
      if (selected) {
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
      } else {
        textarea.setSelectionRange(start + prefix.length, start + prefix.length + 4);
      }
    });
  }, [content]);

  // Insert line prefix (heading, list item, quote)
  const insertLinePrefix = useCallback((prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const before = content.substring(0, start);
    const after = content.substring(start);

    // Find the beginning of the current line
    const lastNewline = before.lastIndexOf('\n');
    const lineStart = lastNewline + 1;
    const beforeLine = content.substring(0, lineStart);
    const afterLineStart = content.substring(lineStart);

    const newContent = beforeLine + prefix + afterLineStart;
    setContent(newContent);

    requestAnimationFrame(() => {
      textarea.focus();
      const newPos = start + prefix.length;
      textarea.setSelectionRange(newPos, newPos);
    });
  }, [content]);

  // Handle cover image upload
  const handleCoverImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Cover image must be an image file (JPG, PNG, WebP, etc.)');
      return;
    }
    setCoverUploading(true);
    const url = await uploadFile(file);
    if (url) {
      setCoverImage(url);
    }
    setCoverUploading(false);
  };

  // Handle inline media upload (insert into content)
  const handleMediaUpload = async (files: FileList | File[]) => {
    setUploading(true);
    const fileArray = Array.from(files);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setUploadProgress(`Uploading ${i + 1}/${fileArray.length}: ${file.name}`);

      const url = await uploadFile(file);
      if (!url) continue;

      let markdown = '';
      if (file.type.startsWith('image/')) {
        markdown = `\n\n![${file.name}](${url})\n\n`;
      } else if (file.type.startsWith('video/')) {
        markdown = `\n\n[VIDEO](${url})\n\n`;
      } else if (file.type === 'application/pdf') {
        markdown = `\n\n[📄 ${file.name}](${url})\n\n`;
      } else {
        markdown = `\n\n[${file.name}](${url})\n\n`;
      }

      insertAtCursor(markdown);
    }

    setUploading(false);
    setUploadProgress(null);
  };

  // Handle drag-and-drop on textarea
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleMediaUpload(files);
    }
  };

  // Handle paste with images
  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const imageFiles: File[] = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) imageFiles.push(file);
      }
    }

    if (imageFiles.length > 0) {
      e.preventDefault();
      await handleMediaUpload(imageFiles);
    }
  };

  // Publish article
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !content || !category) {
      alert('Please fill in all required fields (Title, Summary, Content, Category).');
      return;
    }

    setPublishing(true);
    onClearSuccess();

    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          title_hi: titleHi,
          summary,
          content,
          category,
          tags,
          status: 'published',
          cover_image: coverImage,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        onPublishSuccess(data.slug);
        setTitle('');
        setTitleHi('');
        setSummary('');
        setContent('');
        setCoverImage(null);
        setTags('Legal Guide, Rights, 2026');
      } else {
        alert(data.error || 'Failed to publish');
      }
    } catch (err: any) {
      alert(err.message || 'Error publishing article');
    } finally {
      setPublishing(false);
    }
  };

  // Simple markdown to HTML for preview
  const renderPreview = (text: string) => {
    return text
      .replace(/### (.+)/g, '<h3 class="text-xl font-serif font-bold text-[#102A43] mt-6 mb-2 pb-2 border-b border-[#DCE5EF]">$1</h3>')
      .replace(/#### (.+)/g, '<h4 class="text-lg font-serif font-bold text-[#102A43] mt-4 mb-1">$1</h4>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-4 max-w-full border border-[#DCE5EF] shadow-sm" />')
      .replace(/\[VIDEO\]\(([^)]+)\)/g, '<video src="$1" controls class="rounded-lg my-4 max-w-full border border-[#DCE5EF] shadow-sm"></video>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#174A8B] underline font-medium" target="_blank">$1</a>')
      .replace(/^> (.+)$/gm, '<blockquote class="pl-4 border-l-4 border-[#174A8B] text-[#64748B] italic my-3">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm text-[#263445]">$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-sm text-[#263445]">$1</li>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#102A43]">
              Publish New Blog Post
            </h2>
            <p className="text-xs text-[#64748B]">
              Write and publish articles with images, videos, and documents. Drag & drop media directly into the editor.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                showPreview
                  ? 'bg-[#174A8B] text-white'
                  : 'bg-[#F6F9FC] text-[#102A43] border border-[#DCE5EF] hover:bg-[#EAF3FC]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {showPreview ? 'Editing' : 'Preview'}
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {pubSuccess && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="flex-1">{pubSuccess}</p>
          <button onClick={onClearSuccess} className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handlePublish}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Main Editor */}
          <div className="lg:col-span-2 space-y-5">
            {/* Cover Image */}
            <div className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43]">
                Cover Image / Featured Banner
              </label>

              {coverImage ? (
                <div className="relative group">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg border border-[#DCE5EF]"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-white text-[#102A43] text-xs font-semibold cursor-pointer"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverImage(null)}
                      className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    coverUploading
                      ? 'border-[#174A8B] bg-[#EAF3FC]'
                      : 'border-[#DCE5EF] hover:border-[#174A8B] hover:bg-[#F6F9FC]'
                  }`}
                  onClick={() => !coverUploading && coverInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); }}
                  onDrop={async (e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) await handleCoverImageUpload(file);
                  }}
                >
                  {coverUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 text-[#174A8B] animate-spin" />
                      <span className="text-xs text-[#174A8B] font-medium">Uploading cover image...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#EAF3FC] flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-[#174A8B]" />
                      </div>
                      <span className="text-sm font-medium text-[#102A43]">
                        Click or drag & drop to upload cover image
                      </span>
                      <span className="text-[11px] text-[#64748B]">
                        Recommended: 1200×630px • JPG, PNG, WebP • Max 10MB
                      </span>
                    </div>
                  )}
                </div>
              )}

              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) await handleCoverImageUpload(file);
                  e.target.value = '';
                }}
              />
            </div>

            {/* Title */}
            <div className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                  Article Title (English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Critical Pre-Litigation Steps Under the Consumer Protection Act, 2019"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#DCE5EF] text-base font-serif focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                  Article Title (Hindi / हिन्दी)
                </label>
                <input
                  type="text"
                  placeholder="e.g. उपभोक्ता संरक्षण अधिनियम 2019 के अंतर्गत आवश्यक पूर्व-मुकदमा कदम"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                Summary / Lead Paragraph <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="A concise 2-3 sentence summary of the legal issue and its importance for citizens. This appears on the blog listing page."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B]"
              />
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-xl border border-[#DCE5EF] shadow-xs overflow-hidden">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-[#F6F9FC] border-b border-[#DCE5EF]">
                <button
                  type="button"
                  title="Heading 2"
                  onClick={() => insertLinePrefix('### ')}
                  className="p-1.5 rounded hover:bg-[#DCE5EF] transition-colors cursor-pointer"
                >
                  <Heading2 className="w-4 h-4 text-[#102A43]" />
                </button>
                <button
                  type="button"
                  title="Heading 3"
                  onClick={() => insertLinePrefix('#### ')}
                  className="p-1.5 rounded hover:bg-[#DCE5EF] transition-colors cursor-pointer"
                >
                  <Heading3 className="w-4 h-4 text-[#102A43]" />
                </button>

                <div className="w-px h-5 bg-[#DCE5EF] mx-1" />

                <button
                  type="button"
                  title="Bold"
                  onClick={() => wrapSelection('**', '**')}
                  className="p-1.5 rounded hover:bg-[#DCE5EF] transition-colors cursor-pointer"
                >
                  <Bold className="w-4 h-4 text-[#102A43]" />
                </button>
                <button
                  type="button"
                  title="Italic"
                  onClick={() => wrapSelection('*', '*')}
                  className="p-1.5 rounded hover:bg-[#DCE5EF] transition-colors cursor-pointer"
                >
                  <Italic className="w-4 h-4 text-[#102A43]" />
                </button>

                <div className="w-px h-5 bg-[#DCE5EF] mx-1" />

                <button
                  type="button"
                  title="Bullet List"
                  onClick={() => insertLinePrefix('- ')}
                  className="p-1.5 rounded hover:bg-[#DCE5EF] transition-colors cursor-pointer"
                >
                  <List className="w-4 h-4 text-[#102A43]" />
                </button>
                <button
                  type="button"
                  title="Numbered List"
                  onClick={() => insertLinePrefix('1. ')}
                  className="p-1.5 rounded hover:bg-[#DCE5EF] transition-colors cursor-pointer"
                >
                  <ListOrdered className="w-4 h-4 text-[#102A43]" />
                </button>
                <button
                  type="button"
                  title="Blockquote"
                  onClick={() => insertLinePrefix('> ')}
                  className="p-1.5 rounded hover:bg-[#DCE5EF] transition-colors cursor-pointer"
                >
                  <Quote className="w-4 h-4 text-[#102A43]" />
                </button>

                <div className="w-px h-5 bg-[#DCE5EF] mx-1" />

                <button
                  type="button"
                  title="Insert Link"
                  onClick={() => {
                    const url = prompt('Enter URL:');
                    if (url) {
                      const linkText = prompt('Link text:', 'Click here') || 'Click here';
                      insertAtCursor(`[${linkText}](${url})`);
                    }
                  }}
                  className="p-1.5 rounded hover:bg-[#DCE5EF] transition-colors cursor-pointer"
                >
                  <Link2 className="w-4 h-4 text-[#102A43]" />
                </button>

                <div className="w-px h-5 bg-[#DCE5EF] mx-1" />

                {/* Media Upload Buttons */}
                <button
                  type="button"
                  title="Upload Image"
                  onClick={() => {
                    const input = mediaInputRef.current;
                    if (input) {
                      input.accept = 'image/*';
                      input.click();
                    }
                  }}
                  className="p-1.5 rounded hover:bg-[#EAF3FC] transition-colors cursor-pointer"
                  disabled={uploading}
                >
                  <ImageIcon className="w-4 h-4 text-[#174A8B]" />
                </button>
                <button
                  type="button"
                  title="Upload Video"
                  onClick={() => {
                    const input = mediaInputRef.current;
                    if (input) {
                      input.accept = 'video/*';
                      input.click();
                    }
                  }}
                  className="p-1.5 rounded hover:bg-[#EAF3FC] transition-colors cursor-pointer"
                  disabled={uploading}
                >
                  <Video className="w-4 h-4 text-[#174A8B]" />
                </button>
                <button
                  type="button"
                  title="Upload PDF / Document"
                  onClick={() => {
                    const input = mediaInputRef.current;
                    if (input) {
                      input.accept = '.pdf';
                      input.click();
                    }
                  }}
                  className="p-1.5 rounded hover:bg-[#EAF3FC] transition-colors cursor-pointer"
                  disabled={uploading}
                >
                  <Paperclip className="w-4 h-4 text-[#174A8B]" />
                </button>

                {uploading && (
                  <span className="text-xs text-[#174A8B] font-medium flex items-center gap-1 ml-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    {uploadProgress || 'Uploading...'}
                  </span>
                )}

                <input
                  ref={mediaInputRef}
                  type="file"
                  className="hidden"
                  multiple
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      await handleMediaUpload(files);
                    }
                    e.target.value = '';
                  }}
                />
              </div>

              {/* Editor / Preview */}
              {showPreview ? (
                <div className="p-6 min-h-[400px]">
                  <div className="text-xs text-[#64748B] uppercase tracking-wider font-semibold mb-4 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    Live Preview
                  </div>
                  {content ? (
                    <div
                      className="prose prose-slate max-w-none text-[#263445] leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
                    />
                  ) : (
                    <div className="text-center py-16 text-sm text-[#64748B]">
                      Start writing in the editor to see a preview here.
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    required
                    rows={18}
                    placeholder={"### Introduction\n\nStart writing your legal blog post here...\n\nYou can use markdown formatting:\n- **Bold** text with double asterisks\n- *Italic* text with single asterisks\n- ### Headings with hash symbols\n- Bullet lists with dashes\n- > Blockquotes with greater-than sign\n\n💡 Drag & drop images directly into this editor, or paste screenshots from your clipboard.\n\n📎 Use the toolbar above to insert images, videos, and PDF documents."}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onDrop={handleDrop}
                    onPaste={handlePaste}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    className={`w-full px-6 py-5 text-sm focus:outline-hidden font-mono leading-relaxed resize-none transition-colors ${
                      dragOver
                        ? 'bg-[#EAF3FC] border-[#174A8B]'
                        : 'bg-white'
                    }`}
                    style={{ minHeight: '400px' }}
                  />
                  {dragOver && (
                    <div className="absolute inset-0 bg-[#174A8B]/10 border-2 border-dashed border-[#174A8B] rounded flex items-center justify-center pointer-events-none">
                      <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center">
                        <Upload className="w-8 h-8 text-[#174A8B] mx-auto mb-2" />
                        <span className="text-sm font-semibold text-[#102A43]">
                          Drop files here to upload & embed
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#F6F9FC] border-t border-[#DCE5EF] text-[11px] text-[#64748B]">
                <div className="flex items-center gap-3">
                  <span>{content.split(/\s+/).filter(Boolean).length} words</span>
                  <span>~{Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200))} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline">Supports: Markdown • Images • Videos • PDFs</span>
                  <span className="sm:hidden">MD + Media</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-5">
            {/* Publish Actions */}
            <div className="bg-white rounded-xl p-5 border border-[#DCE5EF] shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#102A43] flex items-center gap-2">
                <Send className="w-4 h-4 text-[#174A8B]" />
                Publish Settings
              </h3>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#DCE5EF] text-xs bg-white focus:outline-hidden focus:border-[#174A8B]"
                >
                  <option value="Data Privacy & Technology">Data Privacy & Technology</option>
                  <option value="Consumer Rights">Consumer Rights</option>
                  <option value="Property & Real Estate">Property & Real Estate</option>
                  <option value="Constitutional Law">Constitutional Law</option>
                  <option value="Employment & Labour Rights">Employment & Labour Rights</option>
                  <option value="Citizen Rights & Police Procedure">Citizen Rights & Police Procedure</option>
                  <option value="Cyber Safety & Fraud Recovery">Cyber Safety & Fraud Recovery</option>
                  <option value="Tenancy & Housing Law">Tenancy & Housing Law</option>
                  <option value="Public Transparency & RTI">Public Transparency & RTI</option>
                  <option value="Family & Senior Citizen Rights">Family & Senior Citizen Rights</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Consumer Protection, e-Daakhil"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#DCE5EF] text-xs focus:outline-hidden focus:border-[#174A8B]"
                />
              </div>

              {/* Tag Preview */}
              {tags && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.split(',').filter(t => t.trim()).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-[#EAF3FC] text-[#174A8B] text-[10px] font-semibold"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-[#DCE5EF]">
                <button
                  type="submit"
                  disabled={publishing || !title || !summary || !content}
                  className="w-full py-3 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-sm transition-all cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {publishing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Publish to Blog
                    </>
                  )}
                </button>
                <p className="text-[10px] text-[#64748B] text-center mt-2">
                  Published immediately to /blog with BCI Rule 36 disclaimer
                </p>
              </div>
            </div>

            {/* Quick Help */}
            <div className="bg-white rounded-xl p-5 border border-[#DCE5EF] shadow-xs">
              <h3 className="text-sm font-bold text-[#102A43] mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#174A8B]" />
                Formatting Guide
              </h3>
              <div className="space-y-2 text-[11px] text-[#64748B] font-mono">
                <div className="flex justify-between"><span>### Heading</span><span className="text-[#102A43] font-sans font-bold">H2</span></div>
                <div className="flex justify-between"><span>#### Heading</span><span className="text-[#102A43] font-sans font-bold">H3</span></div>
                <div className="flex justify-between"><span>**bold**</span><span className="text-[#102A43] font-sans"><strong>bold</strong></span></div>
                <div className="flex justify-between"><span>*italic*</span><span className="text-[#102A43] font-sans"><em>italic</em></span></div>
                <div className="flex justify-between"><span>- item</span><span className="text-[#102A43] font-sans">• item</span></div>
                <div className="flex justify-between"><span>&gt; quote</span><span className="text-[#102A43] font-sans italic">quote</span></div>
                <div className="flex justify-between"><span>[text](url)</span><span className="text-[#174A8B] font-sans underline">link</span></div>
                <div className="flex justify-between"><span>![alt](url)</span><span className="text-[#102A43] font-sans">image</span></div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DCE5EF] text-[11px] text-[#64748B]">
                <p className="font-semibold text-[#102A43] mb-1">📎 Media Tips:</p>
                <ul className="space-y-1 list-disc pl-4">
                  <li>Drag & drop images into the editor</li>
                  <li>Paste screenshots from clipboard</li>
                  <li>Use toolbar buttons for video & PDF</li>
                  <li>Max file size: 10 MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
