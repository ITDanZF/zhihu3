# 仿知乎社交网站，实现简单的问答系统

## 运行命令
```javascript
pnpm i
pnpm run dev
```
## 数据库结构
用户表（user）

| 字段名称 | 数据类型 | 描述 |
| --- | --- | --- |
| id | int | 用户 ID |
| username | varchar | 用户名 |
| password | varchar | 密码 |
| email | varchar | 电子邮件 |
| avatar | varchar | 头像图片 URL |
| introduction | varchar | 个人简介 |
| reputation | int | 用户声望 |
| created_at | datetime | 注册时间 |
| updated_at | datetime | 最后修改时间 |
问题表（question）

| 字段名称 | 数据类型 | 描述 |
| --- | --- | --- |
| id | int | 问题 ID |
| user_id | int | 提问用户 ID |
| title | varchar | 问题标题 |
| content | text | 问题内容 |
| created_at | datetime | 提问时间 |
| updated_at | datetime | 最后修改时间 |
回答表（answer）

| 字段名称 | 数据类型 | 描述 |
| --- | --- | --- |
| id | int | 回答 ID |
| user_id | int | 回答用户 ID |
| question_id | int | 回答所属问题 ID |
| content | text | 回答内容 |
| created_at | datetime | 回答时间 |
| updated_at | datetime | 最后修改时间 |
标签表（tag）

| 字段名称 | 数据类型 | 描述 |
| --- | --- | --- |
| id | int | 标签 ID |
| name | varchar | 标签名称 |
| description | varchar | 标签描述 |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 最后修改时间 |
问题标签表（question_tag）

| 字段名称 | 数据类型 | 描述 |
| --- | --- | --- |
| id | int | 问题标签 ID |
| question_id | int | 问题 ID |
| tag_id | int | 标签 ID |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 最后修改时间 |
用户关注表（user_follow）

| 字段名称 | 数据类型 | 描述 |
| --- | --- | --- |
| id | int | 用户关注 ID |
| user_id | int | 关注用户 ID |
| follow_id | int | 被关注用户 ID |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 最后修改时间 |
用户点赞表（user_like）

| 字段名称 | 数据类型 | 描述 |
| --- | --- | --- |
| id | int | 用户点赞 ID |
| user_id | int | 点赞用户 ID |
| answer_id | int | 被点赞回答 ID |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 最后修改时间 |


# 阿里云成功短信发送并返回
```typescript
SendSmsResponse {
  headers: {
    date: 'Mon, 24 Apr 2023 10:22:55 GMT',
    'content-type': 'application/json;charset=utf-8',
    'content-length': '110',
    connection: 'keep-alive',
    'access-control-allow-origin': '*',
    'x-acs-request-id': 'xxxxxxxxxxxxxxxxxxx',
    'x-acs-trace-id': 'xxxxxxxxxxxxxxxxxxxxxxx'
  },
  statusCode: 200,
  body: SendSmsResponseBody {
    bizId: 'xxxxxxxxxxxxxxxxx',
    code: 'OK',
    message: 'OK',
    requestId: 'xxxxxxxxxxxxxxxxxxxxx'
  }
} 
```