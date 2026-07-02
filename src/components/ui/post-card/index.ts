import { PostCardActionRow } from "./action-row";
import { PostCardAvatar } from "./avatar";
import { PostCardContent } from "./content";
import { PostCardDivider } from "./divider";
import { PostCardPrimaryActions } from "./primary-actions";
import { PostCardPrimaryActionsContainer } from "./primary-actions-container";
import { PostCardPrimaryActionsIcon } from "./primary-actions-icon";
import { PostCardPrimaryActionsItem } from "./primary-actions-item";
import { PostCardPrimaryActionsLabel } from "./primary-actions-label";
import { PostCardRoot } from "./root";
import { PostCardSubtitle } from "./subtitle";
import { PostCardTitle } from "./title";
import { PostCardVideo } from "./video";
const PrimaryActions = Object.assign(PostCardPrimaryActions, {
  Container: PostCardPrimaryActionsContainer,
  Item: PostCardPrimaryActionsItem,
  Icon: PostCardPrimaryActionsIcon,
  Label: PostCardPrimaryActionsLabel,
});

const PostCard = Object.assign(PostCardRoot, {
  Title: PostCardTitle,
  Content: PostCardContent,
  Avatar: PostCardAvatar,
  Subtitle: PostCardSubtitle,
  Video: PostCardVideo,
  ActionRow: PostCardActionRow,
  PrimaryActions: PrimaryActions,
  Divider: PostCardDivider,
});

export { PostCard };
