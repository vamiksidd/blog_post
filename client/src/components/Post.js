import React from "react";
import "../App.css";
function Post() {
  return (
    <div className="container">
      <div className="post">
        <img
          src="https://www.hindustantimes.com/ht-img/img/2024/02/09/550x309/gemini_1707453101926_1707453102117.jpeg"
          alt="not loaded"
        />
        <div className="text">
          <h2>Google renames its AI services as Gemini</h2>
          <span>Dan Davy</span>
          <p>
            The Gemini app initially will be released in the U.S. in English
            before expanding to the Asia-Pacific region next week, with versions
            in Japanese and Korean
          </p>
        </div>
      </div>
    </div>
  );
}

export default Post;
