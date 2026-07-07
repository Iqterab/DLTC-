const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    db.entities.BlogPost.get(id)
      .then(res => { setPost(res); setLoading(false); })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg pt-20">
        <div className="text-center">
          <h2 className="font-serif-display text-3xl text-theme-heading mb-4">Post Not Found</h2>
          <Link to="/blog" className="text-gold hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-theme-bg pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-theme-body hover:text-gold transition-colors text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {post.publishDate && (
          <div className="flex items-center gap-2 text-gold/60 text-xs mb-4">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        )}

        <h1 className="font-serif-display text-4xl md:text-5xl text-theme-heading leading-tight mb-8">{post.title}</h1>

        {post.coverImage && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8 border border-gold/10">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-invert prose-sm max-w-none text-theme-body leading-relaxed
          [&_h1]:text-theme-heading [&_h1]:font-serif-display [&_h1]:text-3xl [&_h1]:mt-8 [&_h1]:mb-4
          [&_h2]:text-theme-heading [&_h2]:font-serif-display [&_h2]:text-2xl [&_h2]:mt-6 [&_h2]:mb-3
          [&_h3]:text-theme-heading [&_h3]:text-xl [&_h3]:mt-5 [&_h3]:mb-2
          [&_a]:text-gold [&_a]:no-underline hover:[&_a]:underline
          [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6
          [&_blockquote]:border-l-2 [&_blockquote]:border-gold/40 [&_blockquote]:pl-4 [&_blockquote]:italic
          [&_img]:rounded-xl">
          <ReactMarkdown>{post.content || ''}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}