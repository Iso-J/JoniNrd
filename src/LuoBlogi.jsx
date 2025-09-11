import React, { useState } from 'react';
import toggled from './Header.jsx';
import './App.css'
import { useTranslation } from 'react-i18next';
import postsData from '../data/db.json';
import Post from '../src/Components/Post.jsx';

function LuoBlogi() {
    if (import.meta.env.MODE !== 'development') {
        return null;
    }
    const categories = [
        'Take care of horse devBlog',
        'Website updates',
    ];
    const { posts: postsRaw } = postsData;
    const posts = [...postsRaw].reverse();
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2,'0');
        const minutes = String(today.getMinutes()).padStart(2,'0');
        return `${hours}:${minutes} ${day}.${month}.${year}`;
    }

    const convertToBase64 = (file) =>{
        return new Promise((resolve, reject) =>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const { t, i18n } = useTranslation("global");
    const [img, setImg] = useState(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [existingPost, setPost] = useState(null);
    const [existingImage, setExistingImg] = useState(null);
    const [language, setLanguage] = useState('fi');
    let base64File = null;

    const handleSubmit = async (e) => {
        alert(base64File);
        e.preventDefault();
        if(img && !existingImage){
            base64File = await convertToBase64(img);
        }
        alert(existingImage);
        const blog = {
            id: existingPost ? existingPost.id : (posts.length + 1).toString(),
            img: existingImage? existingImage : base64File,
            title,
            body,
            author,
            category,
            language,
            createdDate: getCurrentDate(),
        };

        fetch('http://localhost:8000/posts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("NewBlogAdded")
        })
    }

    const hasSelectedPost = existingPost !== null;

    const setExistingPost = (id) => {
        const selectedPost = posts.find(post => post.id === id)
        const duplicatePosts = posts.filter(post => post.id === id && post !== selectedPost);
        if (duplicatePosts.length > 0) {
            alert("Already exists");
            setPost(null);
            return;
        }
        if (selectedPost) {
            setPost(selectedPost);
            setExistingImg(selectedPost.img);

            if (selectedPost.language == "fi") {
                setLanguage("en");
            }
            else {
                setLanguage("fi");
            }
            setCategory(selectedPost.category);
        }
        else {
            setPost(null);
            setCategory(categories[0]);
            setLanguage("fi");
        }
    }

    return (
        <div className='app'>
            <div className='blogi'>
                <div className={`background`}>
                    <div className='content'>
                        <div className='title'>{t("header.luoBlogi")}</div>
                        <form onSubmit={handleSubmit}>
                            <img src={img? URL.createObjectURL(img): ''}></img>
                            <input type='file'
                                onChange={(e) => {const file = e.target.files[0]; setImg(file)}}
                            />
                            <input type='text' required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <input type='text' required
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            <input type='text' required
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}>
                                {categories.map((val, index) => (
                                    <option key={index} value={val}>{val}</option>
                                ))}
                            </select>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}>
                                 {(hasSelectedPost && existingPost.language == "en") || !hasSelectedPost? (
                                <option value="fi">FI</option>
                                ): null}
                                {(hasSelectedPost && existingPost.language == "fi") || !hasSelectedPost? (
                                    <option value="en">EN</option>
                                ): null}
                            </select>
                            <select
                                onChange={(e) => setExistingPost(e.target.value)}
                                value={existingPost ? existingPost.id : ''}
                            >
                                <option value="">Create a new post</option> {/* Placeholder option */}
                                {posts.map((val, index) => (
                                    <option key={index} value={val.id}>{val.title} {val.language}</option>
                                ))}
                            </select>
                            <button>Create</button>
                        </form>
                        <p>{title}</p>
                        <p>{body}</p>
                        <p>{author}</p>
                        <p>{category}</p>
                        <p>{language}</p>
                        <p>selected post id: {existingPost ? existingPost.id : 'None'}</p>
                        <p>{getCurrentDate()}</p>
                        <p>{import.meta.env.MODE}</p>
                    </div>
                </div>
            </div>
        </div>
    );
    //TODO FINISH THIS https://www.youtube.com/watch?v=EcRFYF4B3IQ&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=29
}

export default LuoBlogi