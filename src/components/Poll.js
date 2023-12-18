import React, { useEffect, useState } from "react";
import "./Poll stayle.css"; // Correct the path to your CSS file if needed
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../fierbase"; // Correct the path to your firebase config file if needed
import img from "./img.png";
import PollPercentage from "./PollPercentage";
import { chatIcon, HeartIcon, ShareIcon, SendIcon } from "./icons";
const Poll = () => {
  const [pollData, setPollData] = useState({
    question: "",
    options: [],
    line: "",
    timeLeft: "",
    votes: 0,
    name: "",
    history: "",
  });
  const pollId = "Hjc86Rc3BGwQ2yPtTpJL"; // Replace with actual document ID from Firestore

  useEffect(() => {
    const fetchPollData = async () => {
      const docRef = doc(db, "votes", pollId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPollData({
          question: data.post,
          options: [data.option1, data.option2, data.option3, data.option4],
          interaction: data.interaction,
          timeLeft: data.timeleft,
          votes: data.votes,
          name: data.name,
          history: data.history,
          likecount: data.likecount,
          sharecount: data.sharecount,
          commentcount: data.commentcount,
          vote1: data.vote1,
          vote2: data.vote2,
          vote3: data.vote3,
          h: data.h,
        });
      } else {
        console.error("No such document!");
      }
    };

    fetchPollData();
  }, [pollId]);

  const handleVote1 = async (optionIndex) => {
    const newVotes = pollData.votes + 1;
    const newvote1 = pollData.vote1 + 1;

    try {
      await updateDoc(doc(db, "votes", pollId), {
        votes: newVotes,
        vote1: newvote1,
      });

      setPollData((prevData) => ({
        ...prevData,
        votes: newVotes,
        vote1: newvote1,
      }));
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  const handleVote2 = async (optionIndex) => {
    const newVotes = pollData.votes + 1;
    const newvote2 = pollData.vote2 + 1;

    try {
      await updateDoc(doc(db, "votes", pollId), {
        votes: newVotes,
        vote2: newvote2,
      });

      setPollData((prevData) => ({
        ...prevData,
        votes: newVotes,
        vote2: newvote2,
      }));
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  const handleVote3 = async (optionIndex) => {
    const newVotes = pollData.votes + 1;
    const newvote3 = pollData.vote3 + 1;

    try {
      await updateDoc(doc(db, "votes", pollId), {
        votes: newVotes,
        vote3: newvote3,
      });

      setPollData((prevData) => ({
        ...prevData,
        votes: newVotes,
        vote3: newvote3,
      }));
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  const handleVote4 = async (optionIndex) => {
    const newVotes = pollData.votes + 1;
    const newh = pollData.h + 1;

    try {
      await updateDoc(doc(db, "votes", pollId), {
        votes: newVotes,
        h: newh,
      });

      setPollData((prevData) => ({
        ...prevData,
        votes: newVotes,
        h: newh,
      }));
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="poll-container">
      <div className="profile-header">
        <img src={img} alt="Profile" className="profile-pic" />
        <div className="profile-details">
          <strong>{pollData.name}</strong>
          <span>{pollData.history}</span>
        </div>
      </div>
      <h2>{pollData.question}</h2>
      <div className="poll-options">
        {/* Manually render each option */}
        {pollData.options.length > 0 && (
          <button onClick={() => handleVote1(0)} className="poll-option">
            {pollData.options[0]}
            {pollData.vote1}
          </button>
        )}
        {pollData.options.length > 1 && (
          <button onClick={() => handleVote2(1)} className="poll-option">
            {pollData.options[1]}
            {pollData.vote2}
          </button>
        )}
        {pollData.options.length > 2 && (
          <button onClick={() => handleVote3(2)} className="poll-option">
            {pollData.options[2]}
            {pollData.vote3}
          </button>
        )}
        {pollData.options.length > 3 && (
          <button onClick={() => handleVote4(3)} className="poll-option">
            {pollData.options[3]}
            {pollData.h}
          </button>
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
      {pollData && <PollPercentage pollData={pollData} />}
    </div>
  );
};

export default Poll;
