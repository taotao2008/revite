import { UseFormMethods } from "react-hook-form";

import { Text, Localizer } from "preact-i18n";

import { Category, InputBox } from "@revoltchat/ui";

import { I18nError } from "../../context/Locale";

type FieldType =
    | "email"
    | "username"
    | "password"
    | "invite"
    | "current_password"
    | "phone";

type Props = Omit<JSX.HTMLAttributes<HTMLInputElement>, "children" | "as"> & {
    type: FieldType;
    showOverline?: boolean;
    register: UseFormMethods["register"];
    error?: string;
    name?: string;
};

export default function FormField({
    type,
    register,
    showOverline,
    error,
    name,
    ...props
}: Props) {
    return (
        <>
            {showOverline && (
                <Category compact>
                    <I18nError error={error}>
                        <Text id={`login.${type}`} />
                    </I18nError>
                </Category>
            )}
            <Localizer>
                <InputBox
                    placeholder={
                        (
                            <Text id={`login.enter.${type}`} />
                        ) as unknown as string
                    }
                    name={
                        type === "current_password" ? "password" : name ?? type
                    }
                    type={
                        type === "invite" || type === "username"
                            ? "text"
                            : type === "current_password"
                            ? "password"
                            : type
                    }
                    // See https://github.com/mozilla/contain-facebook/issues/783
                    className="fbc-has-badge"
                    ref={register(
                        type === "password" || type === "current_password"
                            ? {
                                  validate: (value: string) =>
                                      value.length === 0
                                          ? "RequiredField"
                                          : value.length < 8
                                          ? "TooShort"
                                          : value.length > 1024
                                          ? "TooLong"
                                          : undefined,
                              }
                            : type === "phone"
                            ? {
                                  required: "RequiredField",
                                  /*pattern: {
                                      /!*value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,*!/
                                      value: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/i,
                                      message: "手机格式不正确",
                                  },*/
                              }
                            : type === "username"
                            ? {
                                  validate: (value: string) =>
                                      value.length === 0
                                          ? "RequiredField"
                                          : value.length < 2
                                          ? "TooShort"
                                          : value.length > 32
                                          ? "TooLong"
                                          : undefined,
                              }
                            : { required: "RequiredField" },
                    )}
                    {...props}
                />
            </Localizer>
        </>
    );
}
