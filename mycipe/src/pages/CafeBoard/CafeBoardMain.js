import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";

// elements, components
import Spinner from "../../assets/image/Spinner.gif";
import { SmallFilterButton, ButtonInner } from "../../elements";
import CafeCard from "../../components/Card/CafeCard";
import ModalBackground from "../../shared/ModalBackground";

// async
import {
  getCafePostListDB,
  getInfinityScrollDB,
} from "../../redux/Async/cafeBoard";

// 무한스크롤 hook
import { useInterSectionObserver } from "../../hooks/index";

const CafeBoardMain = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const cafeList = useSelector(
    (state) => state.cafeBoard && state.cafeBoard.cafeList
  );

  const [currentSorting, setCurrentSorting] = useState({
    sortedByDate: true,
    sortedByLikes: false,
  });

  const target = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef(1);

  // 처음 페이지 진입했을 때 page=1인 data을 받아온다.
  useEffect(() => {
    dispatch(
      getCafePostListDB({
        page: 1,
        sortBy: currentSorting.sortedByDate
          ? "sortBy=regDate&sortByLike=false"
          : "sortBy=regDate&sortByLike=true",
      })
    );
  }, [dispatch, currentSorting.sortedByDate]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // 관찰이 시작될 때 실행될 콜백 함수
  const fetchMorecafe = (page) => {
    setIsLoading(true);
    dispatch(
      getInfinityScrollDB({
        page: page,
        sortBy: currentSorting.sortedByDate
          ? "sortBy=regDate&sortByLike=false"
          : "sortBy=regDate&sortByLike=true",
      })
    )
      .unwrap()
      .then(() => {
        setIsLoading(false);
      });
  };

  useInterSectionObserver(fetchMorecafe, pageRef, target.current, cafeList);

  return (
    <>
      <BoardMainContainer>
        {isActive && <ModalBackground />}
        {/* 정렬 박스 */}
        <ButtonInner height="32px" margin="12px 0px 8px 0px" small>
          <SmallFilterButton
            active={currentSorting.sortedByDate}
            _onClick={() => {
              setCurrentSorting({
                sortedByDate: true,
                sortedByLikes: false,
              });
              pageRef.current = 1;
            }}
          >
            최신순
          </SmallFilterButton>
          <SmallFilterButton
            padding="0px"
            active={currentSorting.sortedByLikes}
            _onClick={() => {
              setCurrentSorting({
                sortedByDate: false,
                sortedByLikes: true,
              });
              pageRef.current = 1;
            }}
          >
            인기순
          </SmallFilterButton>
        </ButtonInner>

        {/* 최신순 */}
        {currentSorting.sortedByDate && (
          <>
            <CardList>
              {cafeList &&
                cafeList.map((r, idx) => {
                  return (
                    <CafeCard
                      _onClick={(e) => {
                        history.push(`/cafeboard/detail/${r.cafeId}`);
                      }}
                      key={r.cafeId}
                      image={r.images[0]}
                      {...r}
                    />
                  );
                })}
            </CardList>
            <div ref={target}>{isLoading && <SpinnerImg src={Spinner} />}</div>
          </>
        )}

        {/* 인기순 */}
        {currentSorting.sortedByLikes && (
          <>
            <CardList>
              {cafeList &&
                cafeList.map((r, idx) => {
                  return (
                    <CafeCard
                      _onClick={() => {
                        history.push(`/cafeboard/detail/${r.cafeId}`);
                      }}
                      key={r.cafeId}
                      image={r.images[0]}
                      {...r}
                    />
                  );
                })}
            </CardList>
            <div ref={target}>{isLoading && <SpinnerImg src={Spinner} />}</div>
          </>
        )}
      </BoardMainContainer>
    </>
  );
};

const BoardMainContainer = styled.div`
  height: auto;
  min-height: calc(100% - 60px);
  padding: 0px 20px 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardList = styled.div`
  width: 100%;
`;

const SpinnerImg = styled.img``;

export default CafeBoardMain;
