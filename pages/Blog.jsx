const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

import SectionHeading from '@/components/SectionHeading';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.BlogPost.filter({ isPublished: true }, '-publishDate', 100)
      .then(res => { setPosts(res); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="pt-32 pb-12 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Blog" title="Insights & Stories." subtitle="Language learning tips, student success stories, and updates from DLTC." />
        </div>
      </section>

      <section className="pb-24 bg-theme-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <div key={i} className="h-80 rounded-2xl bg-theme-surface border border-gold/10 animate-pulse" />)}
            </div>
          ) : posts.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <p className="text-theme-body">No blog posts published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <Link key={post.id} to={`/blog/${post.id}`}
                  className="glass-card rounded-2xl overflow-hidden group hover:transform hover:-translate-y-1 transition-all duration-500">
                  <div className="aspect-video bg-theme-surface overflow-hidden">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-serif-display text-3xl text-gold/20">DLTC</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {post.publishDate && (
                      <div className="flex items-center gap-2 text-gold/60 text-xs mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    )}
                    <h3 className="font-serif-display text-xl text-theme-heading mb-2 group-hover:text-gold transition-colors">{post.title}</h3>
                    <p className="text-theme-body text-sm line-clamp-2">{post.content?.replace(/[#*]/g, '').slice(0, 120)}</p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-medium mt-4 group-hover:gap-3 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}