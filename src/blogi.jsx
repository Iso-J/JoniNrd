import React, { useEffect, useState } from 'react';
import toggled from './Header.jsx';
import './App.css'
import { useTranslation } from 'react-i18next';
import posts from '../src/blogEntries/Intro/posts.jsx';
import Post from '../src/Components/Post.jsx';
import postsTest from '../data/db.json';
import { Link } from 'react-router-dom';

function Blogi({ toggled }) {
    const { t, i18n } = useTranslation("global");
    const inDev = import.meta.env.MODE === 'development';
    const path = inDev? '../data/db.json' : '../public/data/db.json';
    const [allPosts, setAllPosts] = useState("");
    const [groupedPosts, setg] = useState("");
    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await import(path); // Try to load
                setAllPosts(data.posts);
                // use data.posts here
            } catch (error) {
                console.error("Could not load JSON file:", error);
                // fallback logic here
            }
        };

        loadPosts();
    }, []);
    useEffect(() =>{
        if (!Array.isArray(allPosts)) return;

    const sortedPosts = [...allPosts].sort((a, b) => b.id - a.id);

    const grouped = sortedPosts.reduce((acc, post) => {
      if (!acc[post.category]) {
        acc[post.category] = {};
      }

      if (!acc[post.category][post.language]) {
        acc[post.category][post.language] = [];
      }

      acc[post.category][post.language].push(post);

      return acc;
    }, {});

    setGroupedPosts(grouped);
  }, [allPosts]);
    
    return (
        <>
            <div className='app'>
                <div className='blogi'>
                    <div className={`background`}>
                        <div className='content'>
                            <div className='title'>{t("header.blogi")}</div>
                            <div>
                                {Object.keys(groupedPosts).map(category => (
                                    <div key={category} className="category">
                                        <h2>{category}</h2>
                                        {Object.keys(groupedPosts[category]).map(language => {
                                            if (language !== i18n.language) return null;
                                            return (
                                                <div key={language} className="language">
                                                    <h3>{language}</h3>
                                                    <ul>
                                                        {groupedPosts[category][language].map(post => (
                                                            <>
                                                                <Link to={`/blogView/${post.id}`}>
                                                                    <li key={post.id}>
                                                                        <div className={`${toggled ? "dark" : ""}`}>
                                                                            <img src={post.img ? post.img : null} className={``}></img>
                                                                        </div>
                                                                        <br />
                                                                        <h4>{post.title}</h4>
                                                                    </li>
                                                                </Link>
                                                            </>
                                                        ))}
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blogi