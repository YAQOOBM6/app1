import React from "react";
import "./PollPercentage.css";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../fierbase";
import img from "./img.png";
import { chatIcon, HeartIcon, ShareIcon, SendIcon } from "./icons";
const PollPercentage = ({ pollData }) => {
  // Calculate the percentage of each option based on the total votes
  const getPercentage1 = (votes) => {
    return ((pollData.vote1 / pollData.votes) * 100).toFixed(1);
  };
  const getPercentage2 = (votes) => {
    return ((pollData.vote2 / pollData.votes) * 100).toFixed(1);
  };
  const getPercentage3 = (votes) => {
    return ((pollData.vote3 / pollData.votes) * 100).toFixed(1);
  };
  const getPercentage4 = (votes) => {
    return ((pollData.h / pollData.votes) * 100).toFixed(1);
  };

  return (
    <div className="poll-container">
      <div className="profile-header">
        <img src={img} alt="Profile" className="profile-pic" />
        <div className="profile-details">
          <strong>{pollData.name}</strong>
          <span>{pollData.history}</span>
        </div>
      </div>{" "}
      <h2>{pollData.question}</h2>
      <div className="poll-options">
        {/* Manually render each option */}
        {pollData.options.length > 0 && (
          <>
            <button className="poll-option">
              {pollData.options[0]}
              {pollData.vote1}
              <div classname="Percentage"></div>
            </button>
            <div classname="Percentage">{getPercentage1(pollData.vote1)}%</div>
          </>
        )}
        {pollData.options.length > 1 && (
          <>
            <button className="poll-option">
              {pollData.options[1]}
              {pollData.vote2}
              <div classname="Percentage"></div>
            </button>
            <div classname="Percentage">{getPercentage2(pollData.vote2)}%</div>
          </>
        )}
        {pollData.options.length > 2 && (
          <>
            <button className="poll-option">
              {pollData.options[2]}
              {pollData.vote3}
              <div classname="Percentage"></div>
              <div classname="Percentage">
                {getPercentage3(pollData.vote3)}%
              </div>
            </button>
            <div classname="Percentage">{getPercentage3(pollData.vote3)}%</div>
          </>
        )}
        {pollData.options.length > 3 && (
          <>
            <button className="poll-option">
              {pollData.options[3]}
              {pollData.h}
            </button>
            <div classname="Percentage">{getPercentage4(pollData.vote4)}%</div>
          </>
        )}
      </div>
      <div className="vote-count">
        {pollData.votes} votes - {pollData.timeLeft}
      </div>
      <div className="interaction-bar">
        <div className="likes">
          <span className="like-icon">👍</span>
          {pollData.interaction}
          <span className="comments">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chat-left-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            </svg>
            Comments ({pollData.commentcount})
          </span>
        </div>
        <hr className="separator" />

        <div className="actions">
          <button className="action-button like-button">
            <HeartIcon></HeartIcon> Like ({pollData.likecount})
          </button>
          <button className="action-button share-button">
            <ShareIcon></ShareIcon> Share ({pollData.sharecount})
          </button>

          <button className="action-button send-button">
            <SendIcon></SendIcon>Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default PollPercentage;
