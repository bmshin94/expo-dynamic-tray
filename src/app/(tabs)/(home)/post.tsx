import { Tray } from "@/components/tray";
import BoostInfoView from "@/components/tray-screens/boost-info";
import { TrayFooterButton } from "@/components/tray-screens/boost-shared";
import DefaultView from "@/components/tray-screens/default-view";
import PayWithView from "@/components/tray-screens/pay-with-view";
import RegionView from "@/components/tray-screens/region-view";
import { GlassButton } from "@/components/ui/button+glass";
import { PostCard } from "@/components/ui/post-card";
import { BookmarkIcon } from "@/components/ui/svg/bookmark-icon";
import { CommentIcon } from "@/components/ui/svg/comment-icon";
import { GrokIcon } from "@/components/ui/svg/grok-icon";
import { HeartIcon } from "@/components/ui/svg/heart-icon";
import { RetweetIcon } from "@/components/ui/svg/retweet-icon";
import { ShareIcon } from "@/components/ui/svg/share-icon";
import { VerifiedBadgeIcon } from "@/components/ui/svg/verify-badge";
import { PAYMENTS, REGIONS } from "@/constants/boost.const";
import { POST_CONTENT } from "@/constants/posts.const";
import { COLORS } from "@/design/tokens";
import { postStyles as styles } from "@/stylesheet/x/post.styles";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useVideoPlayer, VideoPlayer } from "expo-video";
import { Fragment, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

export default function Post() {
  const [fontLoaded] = useFonts({
    HeavyChirp: require("@/assets/chirp/heavy.ttf"),
  });

  const [tier, setTier] = useState("25");
  const [region, setRegion] = useState("uk");
  const [payWith, setPayWith] = useState("apple");

  const player = useVideoPlayer(
    {
      uri: POST_CONTENT.attachments?.filter(
        (attachment) => attachment.type === "video",
      )[0]?.url,
    },
    (player: VideoPlayer) => {
      player.loop = true;
      player.play();
    },
  );
  return (
    <Fragment>
      <Tray>
        <Stack.Header transparent />
        <Stack.Screen
          options={{
            headerTitleStyle: {
              fontFamily: fontLoaded ? "HeavyChirp" : undefined,
            },
          }}
        />
        <Stack.Screen.BackButton
          displayMode="generic"
          src={{
            uri: Image.resolveAssetSource(
              require("@/assets/icons/arrow-backward.png"),
            ).uri,
          }}
        />

        <Stack.Toolbar placement="right">
          <Stack.Toolbar.View separateBackground>
            <GrokIcon />
          </Stack.Toolbar.View>
          <Stack.Toolbar.Button
            separateBackground
            icon={"ellipsis"}
            onPress={() => Alert.alert("Share")}
          />
        </Stack.Toolbar>

        <ScrollView
          contentInsetAdjustmentBehavior="always"
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <PostCard id="post-card-heading">
            <View style={styles.mainRow}>
              <PostCard.Avatar source={POST_CONTENT.avatar} />
              <View style={{ flex: 1 }}>
                <View style={styles.headingContainer}>
                  <PostCard.Title>{POST_CONTENT.displayName}</PostCard.Title>
                  {POST_CONTENT.isVerified && <VerifiedBadgeIcon size={16} />}
                </View>
                <PostCard.Subtitle>{`@${POST_CONTENT.username}`}</PostCard.Subtitle>
              </View>
              <View>
                <Tray.Trigger asChild>
                  <GlassButton>
                    <Text style={styles.glassButtonText}>Boost</Text>
                  </GlassButton>
                </Tray.Trigger>
              </View>
            </View>

            <PostCard.Content>{POST_CONTENT.content}</PostCard.Content>
            <PostCard.Video player={player} />
            <PostCard.ActionRow
              date={POST_CONTENT.createdAt}
              time={POST_CONTENT.exactTime}
              views={POST_CONTENT.views}
            />
            <PostCard.PrimaryActions>
              <PostCard.PrimaryActions.Container>
                <PostCard.PrimaryActions.Item>
                  <PostCard.PrimaryActions.Icon>
                    <CommentIcon color={COLORS.MUTED_FOREGROUND} />
                  </PostCard.PrimaryActions.Icon>
                  <PostCard.PrimaryActions.Label>
                    {POST_CONTENT.commentCount}
                  </PostCard.PrimaryActions.Label>
                </PostCard.PrimaryActions.Item>
              </PostCard.PrimaryActions.Container>
              <PostCard.PrimaryActions.Container>
                <PostCard.PrimaryActions.Item>
                  <PostCard.PrimaryActions.Icon>
                    <RetweetIcon color={COLORS.MUTED_FOREGROUND} />
                  </PostCard.PrimaryActions.Icon>
                  <PostCard.PrimaryActions.Label>
                    {POST_CONTENT.retweetCount}
                  </PostCard.PrimaryActions.Label>
                </PostCard.PrimaryActions.Item>
              </PostCard.PrimaryActions.Container>

              <PostCard.PrimaryActions.Container>
                <PostCard.PrimaryActions.Item>
                  <PostCard.PrimaryActions.Icon>
                    <HeartIcon color={COLORS.MUTED_FOREGROUND} />
                  </PostCard.PrimaryActions.Icon>
                  <PostCard.PrimaryActions.Label>
                    {POST_CONTENT.likesCount}
                  </PostCard.PrimaryActions.Label>
                </PostCard.PrimaryActions.Item>
              </PostCard.PrimaryActions.Container>
              <PostCard.PrimaryActions.Container>
                <PostCard.PrimaryActions.Item>
                  <PostCard.PrimaryActions.Icon>
                    <BookmarkIcon color={COLORS.MUTED_FOREGROUND} />
                  </PostCard.PrimaryActions.Icon>
                  <PostCard.PrimaryActions.Label>
                    {POST_CONTENT.bookmarks}
                  </PostCard.PrimaryActions.Label>
                </PostCard.PrimaryActions.Item>
              </PostCard.PrimaryActions.Container>
              <PostCard.PrimaryActions.Container>
                <PostCard.PrimaryActions.Item>
                  <PostCard.PrimaryActions.Icon>
                    <ShareIcon color={COLORS.MUTED_FOREGROUND} />
                  </PostCard.PrimaryActions.Icon>
                </PostCard.PrimaryActions.Item>
              </PostCard.PrimaryActions.Container>
            </PostCard.PrimaryActions>

            <PostCard.PrimaryActions forceSpaceBetween>
              <PostCard.PrimaryActions.Container>
                <PostCard.PrimaryActions.Item style={styles.labelGap}>
                  <PostCard.PrimaryActions.Label style={styles.label}>
                    Relevant
                  </PostCard.PrimaryActions.Label>
                  <PostCard.PrimaryActions.Icon>
                    <SymbolView
                      name={"chevron.down"}
                      size={12}
                      weight={"bold"}
                      tintColor={COLORS.MUTED_FOREGROUND}
                    />
                  </PostCard.PrimaryActions.Icon>
                </PostCard.PrimaryActions.Item>
              </PostCard.PrimaryActions.Container>
              <PostCard.PrimaryActions.Container>
                <PostCard.PrimaryActions.Item style={styles.labelGap}>
                  <PostCard.PrimaryActions.Label style={styles.label}>
                    View Activity
                  </PostCard.PrimaryActions.Label>
                  <PostCard.PrimaryActions.Icon>
                    <SymbolView
                      name={"chevron.forward"}
                      size={12}
                      weight={"bold"}
                      tintColor={COLORS.MUTED_FOREGROUND}
                    />
                  </PostCard.PrimaryActions.Icon>
                </PostCard.PrimaryActions.Item>
              </PostCard.PrimaryActions.Container>
            </PostCard.PrimaryActions>

            <PostCard.Divider />

            {POST_CONTENT.comments?.map((comment, index) => (
              <View style={styles.commentRow} key={index}>
                <PostCard.Avatar source={comment.avatar} />
                <View style={{ flex: 1 }}>
                  <View style={styles.commentHeading}>
                    <PostCard.Title>{comment.displayName}</PostCard.Title>
                    {POST_CONTENT.isVerified && <VerifiedBadgeIcon size={14} />}
                    <PostCard.Subtitle>{`@${comment.username} • ${comment.date}`}</PostCard.Subtitle>
                  </View>
                  <View style={styles.commentContentHeading}>
                    <PostCard.Subtitle>
                      <Text style={styles.commentContent}>
                        {comment.content}
                      </Text>
                    </PostCard.Subtitle>
                  </View>

                  <PostCard.PrimaryActions style={styles.commentActions}>
                    <PostCard.PrimaryActions.Container>
                      <PostCard.PrimaryActions.Item>
                        <PostCard.PrimaryActions.Icon>
                          <CommentIcon
                            color={COLORS.MUTED_FOREGROUND}
                            size={20}
                          />
                        </PostCard.PrimaryActions.Icon>
                      </PostCard.PrimaryActions.Item>
                    </PostCard.PrimaryActions.Container>
                    <PostCard.PrimaryActions.Container>
                      <PostCard.PrimaryActions.Item>
                        <PostCard.PrimaryActions.Icon>
                          <RetweetIcon
                            color={COLORS.MUTED_FOREGROUND}
                            size={20}
                          />
                        </PostCard.PrimaryActions.Icon>
                      </PostCard.PrimaryActions.Item>
                    </PostCard.PrimaryActions.Container>

                    <PostCard.PrimaryActions.Container>
                      <PostCard.PrimaryActions.Item>
                        <PostCard.PrimaryActions.Icon>
                          <HeartIcon
                            color={COLORS.MUTED_FOREGROUND}
                            size={20}
                          />
                        </PostCard.PrimaryActions.Icon>
                      </PostCard.PrimaryActions.Item>
                    </PostCard.PrimaryActions.Container>
                    <PostCard.PrimaryActions.Container>
                      <PostCard.PrimaryActions.Item>
                        <PostCard.PrimaryActions.Icon>
                          <SymbolView
                            name={"hand.thumbsdown"}
                            tintColor={COLORS.MUTED_FOREGROUND}
                            size={20}
                          />
                        </PostCard.PrimaryActions.Icon>
                      </PostCard.PrimaryActions.Item>
                    </PostCard.PrimaryActions.Container>
                    <PostCard.PrimaryActions.Container>
                      <PostCard.PrimaryActions.Item>
                        <PostCard.PrimaryActions.Icon>
                          <BookmarkIcon
                            color={COLORS.MUTED_FOREGROUND}
                            size={20}
                          />
                        </PostCard.PrimaryActions.Icon>
                      </PostCard.PrimaryActions.Item>
                    </PostCard.PrimaryActions.Container>
                    <PostCard.PrimaryActions.Container>
                      <PostCard.PrimaryActions.Item>
                        <PostCard.PrimaryActions.Icon>
                          <ShareIcon
                            color={COLORS.MUTED_FOREGROUND}
                            size={20}
                          />
                        </PostCard.PrimaryActions.Icon>
                      </PostCard.PrimaryActions.Item>
                    </PostCard.PrimaryActions.Container>
                  </PostCard.PrimaryActions>
                </View>
                <View style={styles.postCommentActions}>
                  <GrokIcon size={15} color={COLORS.MUTED_FOREGROUND} />
                  <SymbolView
                    name={"ellipsis"}
                    size={15}
                    tintColor={COLORS.MUTED_FOREGROUND}
                  />
                </View>
              </View>
            ))}
          </PostCard>
        </ScrollView>
        <Tray.Content>
          <Tray.View id="default" footer={<TrayFooterButton />}>
            <DefaultView
              tier={tier}
              onTierChange={setTier}
              region={region}
              payWith={payWith}
            />
          </Tray.View>
          <Tray.View id="region" hideFooter>
            <RegionView
              options={REGIONS}
              selectedValue={region}
              onSelect={setRegion}
            />
          </Tray.View>
          <Tray.View id="payWith" hideFooter>
            <PayWithView
              options={PAYMENTS}
              selectedValue={payWith}
              onSelect={setPayWith}
            />
          </Tray.View>
          <Tray.View id="boost-info" footer={<TrayFooterButton />}>
            <BoostInfoView />
          </Tray.View>
        </Tray.Content>
      </Tray>
    </Fragment>
  );
}
