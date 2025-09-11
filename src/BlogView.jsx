import React, {useEffect, Suspense, useState } from 'react';
import toggled from './Header.jsx';
import './App.css'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { posts } from '../data/db.json';

function BlogView({ toggled }) {
    const { t, i18n } = useTranslation("global");
    const { id } = useParams();
    const [post, setPost] = useState("");
    const inDev = import.meta.env.MODE === 'development';
    const path = inDev? '../data/db.json' : '../public/data/db.json';
    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await import(path); 
                const post = data.posts.find(
                    p => String(p.id) === String(id) && p.language === "fi"
                );
                setPost(post);
            } catch (error) {
                console.log("Error Loading file")
            }
        };

        loadPosts();
    }, [id]);
    return (
        <>
            <div className='app'>
                <div className='blogi'>
                    <div className={`background`}>
                        <div className='content'>
                            <div className={`${toggled ? "dark" : ""}`}>
                                <img src={post.img} ></img>
                            </div>
                            <div className='title'>{post.title}</div>
                            <p>{post.body}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogView