# 요구사항

## API 설계

### 1. 인증/인가

| CRUD          | HTTP   | URI                  |
| ------------- | ------ | -------------------- |
| 회원가입      | POST   | `/api/auth/join`     |
| 로그인        | POST   | `/api/auth/login`    |
| 로그아웃      | POST   | `/api/auth/logout`   |
| 회원탈퇴      | DELETE | `/api/auth/withdraw` |
| 비밀번호 변경 | PATCH  | `/api/auth/password` |
| 토큰 갱신     | POST   | `/api/auth/refresh`  |

### 2. 사용자

| CRUD             | HTTP  | URI                   |
| ---------------- | ----- | --------------------- |
| 사용자 정보 조회 | GET   | `/api/users/{userId}` |
| 사용자 정보 수정 | PATCH | `/api/users/{userId}` |

### 3. 동영상

| CRUD               | HTTP   | URI                          |
| ------------------ | ------ | ---------------------------- |
| 동영상 업로드      | POST   | `/api/videos`                |
| 동영상 목록 조회   | GET    | `/api/videos`                |
| 동영상 조회        | GET    | `/api/videos/{videoId}`      |
| 동영상 수정        | PATCH  | `/api/videos/{videoId}`      |
| 동영상 삭제        | DELETE | `/api/videos/{videoId}`      |
| 동영상 검색        | GET    | `/api/videos/search`         |
| 동영상 좋아요      | POST   | `/api/videos/{videoId}/like` |
| 동영상 좋아요 취소 | DELETE | `/api/videos/{videoId}/like` |

### 4. 댓글

| CRUD               | HTTP   | URI                                                                 |
| ------------------ | ------ | ------------------------------------------------------------------- |
| 댓글 작성          | POST   | `/api/videos/{videoId}/comments`                                    |
| 댓글 목록 조회     | GET    | `/api/videos/{videoId}/comments`                                    |
| 댓글 수정          | PATCH  | `/api/videos/{videoId}/comments/{commentId}`                        |
| 댓글 삭제          | DELETE | `/api/videos/{videoId}/comments/{commentId}`                        |
| 대댓글 작성        | POST   | `/api/videos/{videoId}/comments/{commentId}/replies`                |
| 대댓글 목록 조회   | GET    | `/api/videos/{videoId}/comments/{commentId}/replies`                |
| 대댓글 수정        | PATCH  | `/api/videos/{videoId}/comments/{commentId}/replies/{replyId}`      |
| 대댓글 삭제        | DELETE | `/api/videos/{videoId}/comments/{commentId}/replies/{replyId}`      |
| 댓글 좋아요        | POST   | `/api/videos/{videoId}/comments/{commentId}/like`                   |
| 댓글 좋아요 취소   | DELETE | `/api/videos/{videoId}/comments/{commentId}/like`                   |
| 대댓글 좋아요      | POST   | `/api/videos/{videoId}/comments/{commentId}/replies/{replyId}/like` |
| 대댓글 좋아요 취소 | DELETE | `/api/videos/{videoId}/comments/{commentId}/replies/{replyId}/like` |
