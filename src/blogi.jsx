import React from 'react';
import toggled from './Header.jsx';
import './App.css'
import { useTranslation } from 'react-i18next';
import posts from '../src/blogEntries/Intro/posts.jsx';
import Post from '../src/Components/Post.jsx';

function Blogi() {
    const { t, i18n } = useTranslation("global");
    return (
        <div className='app'>
            <div className='blogi'>
                <div className={`background`}>
                    <div className='content'>
                        <div className='title'>{t("header.blogi")}</div>
                        <div className="post-list">
                            {posts.map((post) => (
                                <Post key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogi