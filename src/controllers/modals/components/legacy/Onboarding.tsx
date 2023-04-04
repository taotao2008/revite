import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./Onboarding.module.scss";
import { Text } from "preact-i18n";
import { useState } from "preact/hooks";

import { Button, Preloader } from "@revoltchat/ui";

// import wideSVG from "/assets/wide.svg";
import background from "./assets/onboarding_background.svg";

import FormField from "../../../../pages/login/FormField";
import { takeError } from "../../../client/jsx/error";
import { ModalProps } from "../../types";

interface FormInputs {
    username: string;
}

export function OnboardingModal({
    callback,
    ...props
}: ModalProps<"onboarding">) {
    const { handleSubmit, register } = useForm<FormInputs>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const onSubmit: SubmitHandler<FormInputs> = ({ username }) => {
        setLoading(true);
        callback(username, true)
            .then(() => props.onClose())
            .catch((err: unknown) => {
                setError(takeError(err));
                setLoading(false);
            });
    };

    return (
        <div className={styles.onboarding}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>{"欢迎使用AiZen人工智能产品"}</h1>
                </div>
                <div className={styles.form}>
                    {loading ? (
                        <Preloader type="spinner" />
                    ) : (
                        <>
                            <p>
                                {"请设置唯一用户名"}
                                <br />
                                {
                                    "其他人将能够通过该名字找到、认出并提及您"
                                }
                                <br />
                                {
                                    ""
                                }
                            </p>
                            <form
                                onSubmit={
                                    handleSubmit(
                                        onSubmit,
                                    ) as unknown as JSX.GenericEventHandler<HTMLFormElement>
                                }>
                                <div>
                                    <FormField
                                        type="username"
                                        register={register}
                                        showOverline
                                        error={error}
                                    />
                                </div>
                                <Button palette="accent">
                                    {"确定"}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
            <img src={background} />
        </div>
    );
}
