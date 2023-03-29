type Element =
    | string
    | {
          type: "image";
          src: string;
      };

export interface ChangelogPost {
    date: Date;
    title: string;
    content: Element[];
}

export const changelogEntries: Record<number, ChangelogPost> = {
    1: {
        date: new Date("2022-06-12T20:39:16.674Z"),
        title: "增加2FA安全账号功能",
        content: [
            "增加双因素身份验证功能，可转到设置以启用恢复代码和身份验证器",
            {
                type: "image",
                src: "https://autumn.revolt.chat/attachments/E21kwmuJGcASgkVLiSIW0wV3ggcaOWjW0TQF7cdFNY/image.png",
            },
            "启用后，系统会提示您登录",
            {
                type: "image",
                src: "https://autumn.revolt.chat/attachments/LWRYoKR2tE1ggW_Lzm547P1pnrkNgmBaoCAfWvHE74/image.png",
            },
            "其他认证方式稍后推出，敬请期待!",
        ],
    },
};

export const changelogEntryArray = Object.keys(changelogEntries).map(
    (index) => changelogEntries[index as unknown as number],
);

export const latestChangelog = changelogEntryArray.length;
