import React, { useEffect, Suspense, useState } from 'react';
import toggled from './Header.jsx';
import './App.css'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { CDN_BASE } from './config.jsx';

function BlogView({ toggled }) {
    const { t, i18n } = useTranslation("global");
    const { id } = useParams();
    const [post, setPost] = useState("");
    const inDev = import.meta.env.MODE === 'development';
    const path = inDev ? '../data/db.json' : `${CDN_BASE}/data/db.json`;
    useEffect(() => {
        const loadPosts = async () => {
            try {
                if (inDev) {
                    const data = await import(path);
                    let post = data.posts.find(
                        p => String(p.id) === String(id) && p.language === i18n.language
                    );
                    if(!post) {
                        //alert("THIS BLOG DOESN'T EXIST IN THIS LANGUAGE... YET.");
                        post = data.posts.find(
                        p => String(p.id) === String(id) && p.language !== i18n.language
                        
                    );
                    }
                    setPost(post);
                }
                else {
                    const response = await fetch(path);
                    const data = await response.json();
                     let post = data.posts.find(
                        p => String(p.id) === String(id) && p.language === i18n.language
                    );
                    if(!post) {
                        //alert("THIS BLOG DOESN'T EXIST IN THIS LANGUAGE... YET.");
                        post = data.posts.find(
                        p => String(p.id) === String(id) && p.language !== i18n.language
                        
                    );
                    }
                    setPost(post);
                }
            } catch (error) {
                console.log("Error Loading file")
            }
        };

        loadPosts();

        const handleLanguageChange=()=>{
            loadPosts();
        }

        i18n.on('languageChanged', handleLanguageChange);
    }, [id] , [i18n]);
    return (
        <>
            <div className='app'>
                <div className='blogi'>
                    <div className={`background`}>
                        <div className='content'>
                            <div className='blog'>
                                <div className={`${toggled ? "dark" : ""}`}>
                                    {post.img && (
                                    <img src={`${CDN_BASE}/${post.img}`} ></img>
                                    )}
                                </div>
                                <div className='title'>{post.title}</div>
                                <p className='blogText'>{post.body}</p>
                                <p className='author'>{t("blogi.kirjoittanut")} JoniNrd {t("blogi.aika")} {post.createdDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogView