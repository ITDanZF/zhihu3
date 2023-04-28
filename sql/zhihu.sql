
CREATE TABLE user (
                      id int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
                      username varchar(255) NOT NULL COMMENT '用户名',
                      password varchar(255) NOT NULL COMMENT '密码',
                      email varchar(255) NOT NULL COMMENT '电子邮件',
                      avatar varchar(255) DEFAULT NULL COMMENT '头像图片URL',
                      introduction varchar(255) DEFAULT NULL COMMENT '个人简介',
                      reputation int(11) NOT NULL DEFAULT '0' COMMENT '用户声望',
                      created_at datetime NOT NULL COMMENT '注册时间',
                      updated_at datetime NOT NULL COMMENT '最后修改时间',
                      PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '用户表';


CREATE TABLE question (
                          id int(11) NOT NULL AUTO_INCREMENT COMMENT '问题ID',
                          user_id int(11) NOT NULL COMMENT '提问用户ID',
                          title varchar(255) NOT NULL COMMENT '问题标题',
                          content text NOT NULL COMMENT '问题内容',
                          created_at datetime NOT NULL COMMENT '提问时间',
                          updated_at datetime NOT NULL COMMENT '最后修改时间',
                          PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '问题表';


CREATE TABLE answer (
                        id int(11) NOT NULL AUTO_INCREMENT COMMENT '回答ID',
                        user_id int(11) NOT NULL COMMENT '回答用户ID',
                        question_id int(11) NOT NULL COMMENT '回答所属问题ID',
                        content text NOT NULL COMMENT '回答内容',
                        created_at datetime NOT NULL COMMENT '回答时间',
                        updated_at datetime NOT NULL COMMENT '最后修改时间',
                        PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '回答表';


CREATE TABLE tag (
                     id int(11) NOT NULL AUTO_INCREMENT COMMENT '标签ID',
                     name varchar(255) NOT NULL COMMENT '标签名称',
                     description varchar(255) DEFAULT NULL COMMENT '标签描述',
                     created_at datetime NOT NULL COMMENT '创建时间',
                     updated_at datetime NOT NULL COMMENT '最后修改时间',
                     PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '标签表';


CREATE TABLE question_tag (
                              id int(11) NOT NULL AUTO_INCREMENT COMMENT '问题标签ID',
                              question_id int(11) NOT NULL COMMENT '问题ID',
                              tag_id int(11) NOT NULL COMMENT '标签ID',
                              created_at datetime NOT NULL COMMENT '创建时间',
                              updated_at datetime NOT NULL COMMENT '最后修改时间',
                              PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '问题标签表';


CREATE TABLE user_follow (
                             id int(11) NOT NULL AUTO_INCREMENT COMMENT '用户关注ID',
                             user_id int(11) NOT NULL COMMENT '关注用户ID',
                             follow_id int(11) NOT NULL COMMENT '被关注用户ID',
                             created_at datetime NOT NULL COMMENT '创建时间',
                             updated_at datetime NOT NULL COMMENT '最后修改时间',
                             PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '用户关注表';


CREATE TABLE user_like (
                           id int(11) NOT NULL AUTO_INCREMENT COMMENT '用户点赞ID',
                           user_id int(11) NOT NULL COMMENT '点赞用户ID',
                           answer_id int(11) NOT NULL COMMENT '被点赞回答ID',
                           created_at datetime NOT NULL COMMENT '创建时间',
                           updated_at datetime NOT NULL COMMENT '最后修改时间',
                           PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '用户点赞表';