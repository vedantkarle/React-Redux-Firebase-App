import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Divider,
  Grid,
  Item,
  Reveal,
  Segment,
  Statistic,
  Header,
  Button,
} from "semantic-ui-react";
import { followUser } from "../../../app/firestore/firestoreService";

const ProfileHeader = ({ profile, isCurrentUser }) => {
  const [loading, setLoading] = useState(false);

  async function handleFollowUser() {
    setLoading(true);
    try {
      await followUser(profile);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile?.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header
                  as="h1"
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile?.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label="Followers" value={10} />
            <Statistic label="Following" value={5} />
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button fluid color="teal" content="Following" />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button
                    onClick={handleFollowUser}
                    basic
                    fluid
                    color="green"
                    content="Follow"
                    loading={loading}
                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default ProfileHeader;
