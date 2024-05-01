// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     CreateDateColumn,
//     UpdateDateColumn,
//     OneToOne,
//     OneToMany,
//     Index,
//     AfterUpdate,
// } from 'typeorm';
// import { DomesticUser } from './domestic_user.entity';
// import { InternationalUser } from './international_user.entity';
// import { AptitudeScore, EnglishScore } from './exam_score.entity';
// import { Project } from './project.entity';
// import { Experience } from './experience.entity';
// import { ResearchPaper } from './research_paper.entity';
// import { Community } from '../communities/community.entity';
// import { CommunityMember } from '../communities/community_member.entity';
// import { RequestTopic } from '../topics/request_topic.entity';
// import { Post } from '../feed/post.entity';
// import { RePost } from '../feed/repost.entity';
// import { Discussion } from '../feed/discussion.entity';
// import { ReDiscussion } from '../feed/rediscussion.entity';
// import { Poll, PollVotes } from '../feed/poll.entity';
// import { RePoll } from '../feed/repoll.entity';
// import { Repository } from '../repository/repository.entity';
// import {
//     DiscussionFollow,
//     PollFollow,
//     PostFollow,
// } from '../feed_activity/follow.entity';
// import {
//     DiscussionPraise,
//     PollPraise,
//     PostPraise,
// } from '../feed_activity/praise.entity';
// import {
//     DiscussionSaved,
//     PollSaved,
//     PostSaved,
// } from '../feed_activity/save_feed.entity';
// import { UserConnection } from './connection.entity';
// import { Message } from '../chat/message.entity';
// import { ChatUser } from '../chat/chatUser.entity';
// import { Request } from '../chat/request.entity';
// import { RequestCommentInDiscussionToUser } from '../feed/request_comment_in_discussion_to_user';
// import {
//     DiscussionComment,
//     PollComment,
//     PostComment,
// } from '../feed_activity/comment.entity';
// import { TopicFollow } from '../topics/topic_follow.entity';
// import { TopicBookmarked } from '../topics/topic_bookmark.entity';
// import { CoursesBookmarked } from '../topics/courses_bookmark.entity';
// import { ScholarshipBookmarked } from '../topics/scholarship_bookmark.entity';
// import { FinanceBookmarked } from '../topics/finance_bookmark.entity';
// import { UserNotification } from '../notification/user_notification.entity';
// import { MessagePermit } from '../../enums/chatPermit.enum';
// import { UserEducation } from './education.user.entity';
// import { StudentPartner } from '../user_services/sp_profile.entity';
// import { AppDataSource } from '../../data-source';
// import { NotificationSetting } from '../notification/notification_setting.entity';
// import { UserMessage } from '../chat/userMessage.entity';
// import {
//     ReDiscussionComment,
//     RePollComment,
//     RePostComment,
// } from '../re_feed_activity/re_comment.entity';
// import {
//     DiscussionCommentLike,
//     PollCommentLike,
//     PostCommentLike,
// } from '../feed_activity/comment_like.entity';
// import {
//     ReDiscussionCommentLike,
//     RePollCommentLike,
//     RePostCommentLike,
// } from '../re_feed_activity/re_comment_like.entity';
// import {
//     ReDiscussionSaved,
//     RePollSaved,
//     RePostSaved,
// } from '../re_feed_activity/re_save_feed.entity';
// import { Chat } from '../chat/chatModel.entity';
// import { UserBookedServices } from '../offered_services/user_booked_services.entity';
// import { AppliedLoans } from '../applyloans/applied_users.entity';
// import { Sessions } from '../applyloans/sessions.entity';
// @Entity()
// export class User {
//     @Index()
//     @PrimaryGeneratedColumn('uuid')
//     user_id: string;

//     @Column()
//     first_name: string;

//     @Column()
//     last_name: string;

//     @Column({ unique: true, nullable: true })
//     email: string;

//     @Column({ unique: true, nullable: true })
//     phone_number: string;

//     @Column({
//         type: 'enum',
//         enum: MessagePermit,
//         default: MessagePermit.CLOSE,
//     })
//     message_permit: MessagePermit;

//     @Column()
//     is_international: boolean;

//     @Column({ default: '' })
//     gender: string;

//     @Column({ type: Date, nullable: true })
//     dob: string;

//     @Column({ default: '' })
//     bio: string;

//     @Column({ default: '', nullable: true })
//     dp_url: string;

//     @Column({ default: '' })
//     cover_url: string;

//     @Column({ default: 0 })
//     draft_count: number;

//     @CreateDateColumn()
//     createdAt: Date;

//     @UpdateDateColumn()
//     updatedAt: Date;

//     @OneToMany(() => Project, (project) => project.user)
//     projects: Project[];

//     @OneToMany(() => Experience, (experience) => experience.user)
//     experiences: Experience[];

//     @OneToMany(() => ResearchPaper, (papers) => papers.user)
//     papers: ResearchPaper[];

//     @OneToOne(
//         () => DomesticUser,
//         (domestic_user) => domestic_user.user,
//         { nullable: true },
//     )
//     domestic_user: DomesticUser;

//     @OneToOne(
//         () => InternationalUser,
//         (international_user) => international_user.user,
//     )
//     international_user: InternationalUser;

//     @OneToOne(() => StudentPartner, (sp) => sp.user)
//     student_partner: StudentPartner;

//     @OneToMany(() => Community, (community) => community.owner)
//     community_owner: Community[];

//     @OneToMany(
//         () => CommunityMember,
//         (community_member) => community_member.user,
//     )
//     community_member: CommunityMember[];

//     @OneToMany(
//         () => RequestTopic,
//         (request_topic) => request_topic.user,
//     )
//     request_topic: RequestTopic[];

//     @OneToMany(() => Post, (post) => post.posted_by)
//     posts: Post[];

//     @OneToMany(() => RePost, (repost) => repost.reposted_by)
//     reposts: RePost[];

//     @OneToMany(() => Poll, (post) => post.posted_by)
//     polls: Poll[];

//     @OneToMany(() => RePoll, (repoll) => repoll.reposted_by)
//     repolls: RePoll[];

//     @OneToOne(() => PollVotes, (votes) => votes.user)
//     votes: PollVotes;

//     @OneToMany(() => Discussion, (discussion) => discussion.posted_by)
//     discussions: Discussion[];

//     @OneToMany(
//         () => ReDiscussion,
//         (rediscussion) => rediscussion.reposted_by,
//     )
//     rediscussions: ReDiscussion[];

//     @OneToMany(
//         () => RequestCommentInDiscussionToUser,
//         (discussion) => discussion.requested_user_to_comment,
//     )
//     comment_requests: RequestCommentInDiscussionToUser[];

//     @OneToMany(
//         () => Repository,
//         (repository) => repository.uploaded_by_user,
//     )
//     repositories: Repository[];

//     @OneToMany(
//         () => PostComment,
//         (postComment) => postComment.commented_by,
//     )
//     postComments: PostComment[];

//     @OneToMany(
//         () => RePostComment,
//         (repostcomment) => repostcomment.commented_by,
//     )
//     RePostComments: RePostComment[];

//     @OneToMany(
//         () => PollComment,
//         (pollComment) => pollComment.commented_by,
//     )
//     pollComments: PollComment[];

//     @OneToMany(
//         () => RePollComment,
//         (repollcomment) => repollcomment.commented_by,
//     )
//     RePollComments: RePollComment[];

//     @OneToOne(() => EnglishScore, (englishScore) => englishScore.user)
//     englishScore: EnglishScore;

//     @OneToOne(
//         () => AptitudeScore,
//         (aptitudeScore) => aptitudeScore.user,
//     )
//     aptitudeScore: AptitudeScore;

//     @OneToMany(
//         () => DiscussionComment,
//         (discussionComment) => discussionComment.commented_by,
//     )
//     discussionComments: DiscussionComment[];

//     @OneToMany(
//         () => ReDiscussionComment,
//         (rediscussionComment) => rediscussionComment.commented_by,
//     )
//     ReDiscussionComments: ReDiscussionComment[];

//     @OneToMany(() => PostFollow, (postFollow) => postFollow.user)
//     followedPosts: PostFollow[];

//     @OneToMany(() => PollFollow, (pollFollow) => pollFollow.user)
//     followedPolls: PollFollow[];

//     @OneToMany(
//         () => DiscussionFollow,
//         (discussionFollow) => discussionFollow.user,
//     )
//     followedDiscussions: DiscussionFollow[];

//     @OneToMany(() => PostPraise, (postPraise) => postPraise.user)
//     praisedPosts: PostPraise[];

//     @OneToMany(() => PollPraise, (pollPraise) => pollPraise.user)
//     praisedPolls: PollPraise[];

//     @OneToMany(
//         () => DiscussionPraise,
//         (discussionPraise) => discussionPraise.user,
//     )
//     praisedDiscussions: DiscussionPraise[];

//     @OneToMany(() => PostSaved, (postSaved) => postSaved.user)
//     savedPosts: PostSaved[];

//     @OneToMany(() => PollSaved, (pollSaved) => pollSaved.user)
//     savedPolls: PollSaved[];

//     @OneToMany(
//         () => DiscussionSaved,
//         (discussionSaved) => discussionSaved.user,
//     )
//     savedDiscussions: DiscussionSaved[];

//     @OneToMany(() => RePostSaved, (repostSaved) => repostSaved.user)
//     resavedPosts: RePostSaved[];

//     @OneToMany(() => RePollSaved, (repollSaved) => repollSaved.user)
//     resavedPolls: RePollSaved[];

//     @OneToMany(
//         () => ReDiscussionSaved,
//         (rediscussionSaved) => rediscussionSaved.user,
//     )
//     resavedDiscussions: ReDiscussionSaved[];

//     @OneToMany(
//         () => UserConnection,
//         (connection) => connection.sent_user,
//     )
//     sent_request: UserConnection[];

//     // Messaging system requirements
//     @OneToMany(() => Message, (message) => message.sender)
//     messages_sent: Message[];

//     @OneToMany(() => UserMessage, (UserMessage) => UserMessage.receiver)
//     messages_receive: UserMessage[];

//     @OneToOne(() => Chat, (chat) => chat.recent_user)
//     recent_user_receiver: Chat[];

//     @OneToMany(() => ChatUser, (chatUser) => chatUser.user, {
//         onDelete: 'CASCADE',
//     })
//     active_chats: ChatUser[];

//     @OneToMany(() => Request, (request) => request.user)
//     requests: Request[];

//     @OneToMany(
//         () => UserConnection,
//         (connection) => connection.accepted_user,
//     )
//     accepted_request: UserConnection[];

//     // Relation with entity carrying user's educational details
//     @OneToMany(() => UserEducation, (education) => education.user, {
//         cascade: true,
//         onDelete: 'CASCADE',
//     })
//     education: UserEducation[];

//     @Column({ default: null })
//     refreshToken: string;

//     // Columns for tracking profile completion
//     @Column({ default: false })
//     isPhone: boolean;

//     @Column({ default: false })
//     isEmail: boolean;

//     @Column({ default: true })
//     whatsappUpdate: boolean;

//     @Column({ default: false })
//     isBio: boolean;

//     @Column({ default: false })
//     isEducation: boolean;

//     @Column({ default: false })
//     isTestScores: boolean;

//     @OneToMany(() => TopicFollow, (topicFollow) => topicFollow.user)
//     followedTopics: TopicFollow[];

//     @OneToMany(
//         () => TopicBookmarked,
//         (topicBookmark) => topicBookmark.user,
//     )
//     bookmarkedTopics: TopicBookmarked[];

//     @OneToMany(
//         () => CoursesBookmarked,
//         (coursesBookmark) => coursesBookmark.user,
//     )
//     bookmarkedCourses: CoursesBookmarked[];

//     @OneToMany(
//         () => ScholarshipBookmarked,
//         (scholarshipBookmark) => scholarshipBookmark.user,
//     )
//     bookmarkedScholarships: ScholarshipBookmarked[];

//     @OneToMany(
//         () => FinanceBookmarked,
//         (financeBookmarked) => financeBookmarked.user,
//     )
//     bookmarkedFinance: FinanceBookmarked[];

//     @OneToMany(
//         () => UserNotification,
//         (userNotification) => userNotification.user,
//     )
//     notifications: UserNotification[];

//     @OneToOne(
//         () => NotificationSetting,
//         (userNotification) => userNotification.user,
//     )
//     notification_settings: NotificationSetting[];

//     @OneToMany(() => PostCommentLike, (commentLike) => commentLike.user)
//     postCommentLikes: PostCommentLike[];

//     @OneToMany(() => PollCommentLike, (commentLike) => commentLike.user)
//     pollCommentLikes: PollCommentLike[];

//     @OneToMany(
//         () => DiscussionCommentLike,
//         (commentLike) => commentLike.user,
//     )
//     discussionCommentLikes: DiscussionCommentLike[];

//     @OneToMany(
//         () => RePostCommentLike,
//         (commentLike) => commentLike.user,
//     )
//     repostCommentLikes: RePostCommentLike[];

//     @OneToMany(() => UserBookedServices, bookedService => bookedService.user)
//     bookedServices: UserBookedServices[];

//     @OneToMany(() => AppliedLoans, appliedLoans => appliedLoans.user)
//     applied_loan_user: AppliedLoans[];

//     @OneToMany(() => Sessions, session => session.user)
//     session_user: Sessions[];

//     @OneToMany(
//         () => RePollCommentLike,
//         (commentLike) => commentLike.user,
//     )
//     repollCommentLikes: RePollCommentLike[];

//     @OneToMany(
//         () => ReDiscussionCommentLike,
//         (commentLike) => commentLike.user,
//     )
//     rediscussionCommentLikes: ReDiscussionCommentLike[];

//     // Trigger for completing the profile tracking
//     @AfterUpdate()
//     async checkProfileCompletion() {
//         if (
//             this.isPhone &&
//             this.isEmail &&
//             this.isBio &&
//             this.isEducation &&
//             this.isTestScores
//         ) {
//             if (this.is_international === false) {
//                 // Update DomesticUser
//                 const domesticUserRepo =
//                     AppDataSource.getRepository(DomesticUser);
//                 const domesticUser =
//                     await domesticUserRepo.findOneOrFail({
//                         where: {
//                             user: { user_id: this.user_id },
//                         },
//                     });
//                 if (domesticUser) {
//                     domesticUser.isUser = true;
//                     await domesticUserRepo.save(domesticUser);
//                 }
//             } else if (this.is_international === true) {
//                 // Update InternationalUser
//                 const internationalUserRepo =
//                     AppDataSource.getRepository(InternationalUser);
//                 const internationalUser =
//                     await internationalUserRepo.findOneOrFail({
//                         where: {
//                             user: { user_id: this.user_id },
//                         },
//                     });

//                 if (internationalUser) {
//                     internationalUser.isUser = true;
//                     await internationalUserRepo.save(internationalUser);
//                 }
//             }
//         }
//     }
// }
