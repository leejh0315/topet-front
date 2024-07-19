// src/components/CommunityPost.js

import React from 'react';
import { BiSolidLike } from "react-icons/bi";
import { BsChatFill } from "react-icons/bs";
import styles from '../../css/communityList.module.css';

const CommunityListData = ({ item, onClick }) => {
  const formatHashtags = hashtagString => {
    const tags = hashtagString.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    const visibleTags = tags.slice(0, 3);
    const remainingTagsCount = tags.length - visibleTags.length;

    return (
      <>
        {visibleTags.map((tag, index) => (
          <span key={index} className={styles.hashtag}>#{tag}</span>
        ))}
        {remainingTagsCount > 0 && (
          <span className={styles.hashtag}>+{remainingTagsCount}</span>
        )}
      </>
    );
  };

  return (
    <div onClick={onClick}>
      <div className={styles.each_community_area}>
        <div className={styles.content_and_photo_container}>
          <div className={styles.titleContentWrap}>
            <div className={styles.community_title}>{item.title}</div>
            <div className={styles.community_content}>{item.content}</div>
          </div>
          {item.images && item.images.length > 0 && (
            <div className={styles.community_photo}>
              <img src={`/${item.images[0].filePath}`} alt={item.images[0].origFileName} />
            </div>
          )}
        </div>
        <div className={styles.community_hashtags}>
          {formatHashtags(item.hashtag)}
        </div>
        <div className={styles.like_and_coment}>
          <div className="icon-group">
            <BiSolidLike className={styles.icon}/>
            <span> 10</span> {/* 여기 나중에 받아온 값으로 변경 */}
          </div>
          <div className="icon-group">
            <BsChatFill className={styles.icon}/>
            <span> 5</span> {/* 여기 나중에 받아온 값으로 변경 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityListData;
