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
    const path = inDev ? '../data/db.json' : '/JoniNrd/data/db.json';
    const [allPosts, setAllPosts] = useState("");
    const [groupedPosts, setGroupedPosts] = useState("");
    const [newestPost, setNewestPost] = useState(null);

    const handleScroll = (e, target) => {
        e.preventDefault();
        target = target.replace(/\s+/g, '-').toLowerCase();
        const section = document.querySelector(`#${target}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        const loadPosts = async () => {
            try {
                if (inDev) {
                    const data = await import(path); // Try to load
                    setAllPosts(data.posts);
                }
                else {
                    const base = import.meta.env.BASE_URL;
                    const response = await fetch(`${path}`); // Try to load
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();
                    console.log(data);
                    setAllPosts(data.posts);
                }
                // use data.posts here
            } catch (error) {
                console.error("Could not load JSON file:", error);
                // fallback logic here
            }
        };

        loadPosts();
    }, []);
    useEffect(() => {
        const loadPosts = async () => {
            if (!Array.isArray(allPosts)) return;

            const parseCreatedDate = (str) => {
            const [time, date] = str.split(" ");
            const [hours, minutes] = time.split(":");
            const [day, month, year] = date.split(".");

            return new Date(year, month - 1, day, hours, minutes);
            };

            const sortedPosts = [...allPosts].sort(
            (a, b) => parseCreatedDate(b.createdDate) - parseCreatedDate(a.createdDate)
            );
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
            const categoryOrder = [
                'blogi.category.websiteupdates',
                'Fanttila devBlog',
                'Take care of horse devBlog',
                'blogi.category.other',
            ];

            const orderedGrouped = categoryOrder.reduce((ordered, category) => {
                if (grouped[category]) {
                    ordered[category] = grouped[category];
                }
                return ordered;
            }, {});

            setGroupedPosts(orderedGrouped);
            let index = 0;
            while (sortedPosts[index].language != i18n.language) {
                index += 1
            }
            setNewestPost(sortedPosts[index]);
        };

        loadPosts();

        const handleLanguageChange = () => {
            loadPosts();
        }
        i18n.on('languageChanged', handleLanguageChange);
    }, [allPosts]);

    return (
        <>
            <div className='app'>
                <div className='tietoa'>
                    <div className={`background`}>
                        <div className='content'>
                            <div className='title'>{t("header.blogi")}</div>
                            <div>
                                <h2>{t("blogi.uusin")}</h2>
                                {newestPost ? (
                                    <Link to={`/blogView/${newestPost.id}`}>
                                        <div key={newestPost.id} className='post'>
                                            <div className={`${toggled ? "dark" : ""}`}>
                                                <img src={newestPost.img ? newestPost.img : null} className={``}></img>
                                            </div>
                                            <h3>{newestPost.title}</h3>
                                            <h4>{t("blogi.kirjoittanut")} JoniNrd {t("blogi.aika")} {newestPost.createdDate}</h4>
                                            <br />
                                        </div>
                                    </Link>
                                ) : null}
                            </div>
                            <div>
                                <h2>{t("blogi.sisalto")}</h2>
                                <ul className="sections">
                                    {Object.keys(groupedPosts).map(category => (
                                        <a href={t(category)} onClick={(e) => handleScroll(e, t(category))}>

                                            <li key={category}>{t(category)}</li>
                                        </a>
                                    ))}
                                </ul>
                            </div>
                            <div className='posts'>
                                {Object.keys(groupedPosts).map(category => (
                                    <div key={category} className="category">
                                        <h2 id={t(category).replace(/\s+/g, '-').toLowerCase()}>{t(category)}</h2>
                                        {Object.keys(groupedPosts[category]).map(language => {
                                            if (language !== i18n.language) return null;
                                            return (
                                                <div key={language} className="language">
                                                    {groupedPosts[category][language].map(post => (
                                                        <>
                                                            <Link to={`/blogView/${post.id}`}>
                                                                <div key={post.id} className='post'>
                                                                    <div className={`${toggled ? "dark" : ""}`}>
                                                                        <img src={post.img ? post.img : null} className={``}></img>
                                                                    </div>
                                                                    <h3>{post.title}</h3>
                                                                    <h4>{t("blogi.kirjoittanut")} JoniNrd {t("blogi.aika")} {post.createdDate}</h4>
                                                                    <br />
                                                                </div>
                                                            </Link>
                                                        </>
                                                    ))}
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