create table ta_profiles
(
    user_id                uuid                                not null
        constraint ta_profile_pkey
            primary key,
    email                  varchar(255)                        not null
        constraint email_unique
            unique,
    biography              text,
    profile_type           varchar(20)                         not null
        constraint ta_profile_profile_type_check
            check ((profile_type)::text = ANY
                   (ARRAY [('club'::character varying)::text, ('user'::character varying)::text])),
    registration_timestamp timestamp default CURRENT_TIMESTAMP not null,
    avatar_url             varchar(255),
    facebook_url           varchar(255),
    instagram_url          varchar(255),
    tiktok_url             varchar(255),
    twitter_url            varchar(255),
    linkedin_url           varchar(255)
);

alter table ta_profiles
    owner to teamlense;

create table ta_user_profiles
(
    user_id     uuid         not null
        constraint ta_user_profile_pkey
            primary key
        constraint ta_user_profile_user_id_fkey
            references ta_profiles,
    birthday    date         not null,
    first_name  varchar(100) not null,
    last_name   varchar(100) not null,
    gender      varchar(10)  not null
        constraint ta_user_profile_gender_check
            check ((gender)::text = ANY
                   (ARRAY [('male'::character varying)::text, ('female'::character varying)::text, ('diverse'::character varying)::text, ('not_specified'::character varying)::text])),
    city        varchar(100),
    country     varchar(100),
    postal_code varchar(20)
);

alter table ta_user_profiles
    owner to teamlense;

create table ta_club_profiles
(
    user_id       uuid         not null
        constraint ta_club_profile_pkey
            primary key
        constraint ta_club_profile_user_id_fkey
            references ta_profiles,
    club_name     varchar(255) not null,
    founding_year integer      not null,
    website       varchar(255),
    address       varchar(255) not null,
    city          varchar(100) not null,
    country       varchar(100) not null,
    postal_code   varchar(20)  not null
);

alter table ta_club_profiles
    owner to teamlense;


