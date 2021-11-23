import { createSlice } from "@reduxjs/toolkit";

import {
  getUserInfoDB,
  getUserWrittenRecipesDB,
  getInfinityScrollWrittenRecipesDB,
  getUserWrittenBoardsDB,
  getInfinityScrollWrittenBoardsDB,
  getUserLikedRecipesDB,
  getInfinityScrollLikedRecipesDB,
  getUserLikedBoardsDB,
  getInfinityScrollLikeBoardsDB,
  userFollowDB,
  userUnFollowDB,
  userFollowListDB,
  userFollowingListDB,
} from "../Async/userPage";

// inititalState
const initialState = {
  isFetching: false,

  // 페이지 유저정보
  userInfo: {
    image: null,
    nickname: "test1",
    followCount: null,
    followingCount: null,
    followStatus: false,
  },

  // 게시물 목록
  postList: {
    userWrittenRecipes: [
      {
        recipeId: 8,
        title: "123",
        nickname: "tester2",
        price: 1,
        imageList: [],
        likecount: 0,
      },
    ],

    userWrittenBoards: [
      {
        boardId: 1,
        title: "123",
        content: "123",
        regDate: null,
        likeCount: 0,
        commentCount: 0,
        imageList: [],
      },
    ],

    userLikedBoards: [
      {
        boardId: 1,
        title: "123",
        content: "123",
        regDate: null,
        likeCount: 0,
        commentCount: 0,
        imageList: [],
      },
    ],

    userLikedRecipes: [
      // {
      //   recipeId: 8,
      //   title: "123",
      //   nickname: "tester2",
      //   price: 1,
      //   imageList: [],
      //   likecount: 0,
      // },
    ],
  },

  userList: [],

  isFollower: false,
};

const userPageSlice = createSlice({
  name: "userPage",

  initialState: initialState,
  //리덕스
  reducers: {
    // 저장된 게시물들 삭제 ()
    resetPost: (state, action) => {
      for (let item in state.postList) {
        state.postList[item] = [];
      }
    },

    updateUserList: (state, action) => {
      state.userList = action.payload;
    },

    setIsFollower: (state, action) => {
      state.isFollower = action.payload;
    },
  },

  extraReducers: {
    // 유저페이지 정보 불러오기
    [getUserInfoDB.pending]: (state, ation) => {
      state.isFetching = true;
    },

    [getUserInfoDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.userInfo = payload;
    },

    [getUserInfoDB.rejected]: (state, action) => {
      state.isFetching = false;
      console.log(action.error);
    },

    [getUserWrittenRecipesDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getUserWrittenRecipesDB.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.postList.userWrittenRecipes = action.payload;
    },
    [getUserWrittenRecipesDB.rejected]: (state, action) => {
      console.log(action.error);
      state.isFetching = false;
    },

    // 유저가 작성한 레시피 무한스크롤 불러오기
    [getInfinityScrollWrittenRecipesDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getInfinityScrollWrittenRecipesDB.fulfilled]: (state, action) => {
      state.isFetching = false;

      state.postList.userWrittenRecipes = [
        ...state.postList.userWrittenRecipes,
        ...action.payload,
      ];
    },
    [getInfinityScrollWrittenRecipesDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 유저가 작성한 게시물 불러오기
    [getUserWrittenBoardsDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getUserWrittenBoardsDB.fulfilled]: (state, action) => {
      state.isFetching = false;

      state.postList.userWrittenBoards = action.payload;
    },
    [getUserWrittenBoardsDB.rejected]: (state, action) => {
      console.log(action.error);
      state.isFetching = false;
    },

    // 유저가 작성한 게시물 무한스크롤 불러오기
    [getInfinityScrollWrittenBoardsDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getInfinityScrollWrittenBoardsDB.fulfilled]: (state, action) => {
      state.isFetching = false;

      state.postList.userWrittenBoards = [
        ...state.postList.userWrittenBoards,
        ...action.payload,
      ];
    },
    [getInfinityScrollWrittenBoardsDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    //유저 좋아요 레시피
    [getUserLikedRecipesDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getUserLikedRecipesDB.fulfilled]: (state, action) => {
      state.isFetching = false;

      state.postList.userLikedRecipes = action.payload;
    },
    [getUserLikedRecipesDB.rejected]: (state, action) => {
      console.log(action.error);
      state.isFetching = false;
    },

    // 유저 좋아요 레시피 무한스크롤
    [getInfinityScrollLikedRecipesDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getInfinityScrollLikedRecipesDB.fulfilled]: (state, action) => {
      state.isFetching = false;
      console.log(2);
      state.postList.userLikedRecipes = [
        ...state.postList.userLikedRecipes,
        ...action.payload,
      ];
    },
    [getInfinityScrollLikedRecipesDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    //유저 좋아요 게시물
    [getUserLikedBoardsDB.pending]: (state, action) => {
      state.isFetching = true;
    },

    [getUserLikedBoardsDB.fulfilled]: (state, action) => {
      state.postList.userLikedBoards = action.payload;
      state.isFetching = false;
    },

    [getUserLikedBoardsDB.rejected]: (state, action) => {
      console.log("에러발생", action.error);
      state.isFetching = false;
    },

    //유저 좋아요 게시물 무한스크롤
    [getInfinityScrollLikeBoardsDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getInfinityScrollLikeBoardsDB.fulfilled]: (state, action) => {
      state.isFetching = false;

      state.postList.userLikedBoards = [
        ...state.postList.userLikedBoards,
        ...action.payload,
      ];
    },
    [getInfinityScrollLikeBoardsDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    //유저 팔로우 하기
    [userFollowDB.pending]: (state, action) => {
      state.isFetching = true;
    },

    [userFollowDB.fulfilled]: (state, action) => {
      const userInfo = action.payload.userInfo;

      if (!state.userList.some((user) => user.nick === userInfo.nickname)) {
        state.userList.push(userInfo);
      }

      state.isFetching = false;
      state.userInfo.followingCount++;
      state.userInfo.followStatus = true;
    },

    [userFollowDB.rejected]: (state, action) => {
      alert("팔로우 하기 에러발생", action.error);
    },

    //유저 팔로우 취소
    [userUnFollowDB.pending]: (state, action) => {
      state.isFetching = true;
    },

    [userUnFollowDB.fulfilled]: (state, action) => {
      const nickname = action.payload.nickname;

      const newUserList = state.userList.filter(
        (user) => user.nickname !== nickname
      );

      state.userList = newUserList;

      state.isFetching = false;
      state.userInfo.followingCount--;

      state.userInfo.followStatus = false;
    },

    [userUnFollowDB.rejected]: (state, action) => {
      alert("팔로우 취소하기 에러발생", action.error);
    },

    //유저 팔로워 리스트 불러오기
    [userFollowListDB.pending]: (state, action) => {
      state.isFetching = true;
      state.isFollower = true;
    },
    [userFollowListDB.fulfilled]: (state, action) => {
      state.isFetching = false;

      state.userList = action.payload;
    },
    [userFollowListDB.rejected]: (state, action) => {
      console.log("팔로우리스트 불러오기 에러발생", action.error);
    },

    //유저 팔로잉리스트 불러오기
    [userFollowingListDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [userFollowingListDB.fulfilled]: (state, action) => {
      state.isFetching = false;

      state.isFollower = false;
      state.userList = action.payload;
    },
    [userFollowingListDB.rejected]: (state, action) => {
      console.log("팔로잉리스트 불러오기 에러발생", action.error);
    },
  },
});

export const { resetPost, updateUserList, updateIsFollowing, setIsFollower } =
  userPageSlice.actions;

export default userPageSlice;
