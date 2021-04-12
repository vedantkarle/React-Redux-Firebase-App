import { formatDistance } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Comment, Header, Segment } from "semantic-ui-react";
import {
  firebaseObjectToArray,
  getEventChatRef,
} from "../../../app/firestore/firebaseService";
import { listenToEventChat } from "../eventActions";
import { CLEAR_COMMENTS } from "../eventConstants";
import EventDetailedChatForm from "./EventDetailedChatForm";

const EventDetailedChat = ({ eventId }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event);

  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  const handleCloseReplyForm = () => {
    setShowReplyForm({ open: false, commentId: null });
  };

  useEffect(() => {
    getEventChatRef(eventId).on("value", (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
      );
    });
    return () => {
      dispatch({ type: CLEAR_COMMENTS });
      getEventChatRef().off();
    };
  }, [eventId, dispatch]);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <EventDetailedChatForm eventId={eventId} parentId={0} />
        <Comment.Group>
          {comments.map((comment) => {
            return (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.photoURL || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div> {formatDistance(comment.date, new Date())} </div>
                  </Comment.Metadata>
                  <Comment.Text>
                    {comment.text.split("\n").map((text, i) => (
                      <span key={i}>
                        {text}
                        <br />
                      </span>
                    ))}
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action
                      onClick={() =>
                        setShowReplyForm({
                          open: !showReplyForm.open,
                          commentId: comment.id,
                        })
                      }
                    >
                      {showReplyForm.open &&
                      showReplyForm.commentId === comment.id
                        ? "Cancel"
                        : "Reply"}
                    </Comment.Action>
                    {showReplyForm.open &&
                      showReplyForm.commentId === comment.id && (
                        <EventDetailedChatForm
                          eventId={eventId}
                          parentId={comment.id}
                          closeForm={handleCloseReplyForm}
                        />
                      )}
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            );
          })}
        </Comment.Group>
      </Segment>
    </>
  );
};

export default EventDetailedChat;
