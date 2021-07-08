import { Message, Group, Inbox } from "@styled-icons/boxicons-solid";
import { At } from "@styled-icons/boxicons-regular";
import { useHistory, useLocation } from "react-router";
import styled, { css } from "styled-components";

import ConditionalLink from "../../lib/ConditionalLink";

import { connectState } from "../../redux/connector";
import { LastOpened } from "../../redux/reducers/last_opened";

import { useSelf } from "../../context/revoltjs/hooks";

import UserIcon from "../common/user/UserIcon";
import IconButton from "../ui/IconButton";

const NavigationBase = styled.div`
    z-index: 100;
    display: flex;
    height: var(--bottom-navigation-height);
    background: var(--secondary-background);
`;

const Button = styled.a<{ active: boolean }>`
    flex: 1;

    > a,
    > div,
    > a > div {
        width: 100%;
        height: 100%;
    }

    ${(props) =>
        props.active &&
        css`
            background: var(--hover);
        `}
`;

interface Props {
    lastOpened: LastOpened;
}

export function BottomNavigation({ lastOpened }: Props) {
    const user = useSelf();
    const history = useHistory();
    const path = useLocation().pathname;

    const channel_id = lastOpened["home"];

    const friendsActive = path.startsWith("/friends");
    const settingsActive = path.startsWith("/settings");
    const homeActive = !(friendsActive || settingsActive);

    return (
        <NavigationBase>
            <Button active={homeActive}>
                <IconButton
                    onClick={() => {
                        if (settingsActive) {
                            if (history.length > 0) {
                                history.goBack();
                            }
                        }

                        if (channel_id) {
                            history.push(`/channel/${channel_id}`);
                        } else {
                            history.push("/");
                        }
                    }}>
                    <Message size={24} />
                </IconButton>
            </Button>
            <Button active={friendsActive}>
                <ConditionalLink active={friendsActive} to="/friends">
                    <IconButton>
                        <Group size={25} />
                    </IconButton>
                </ConditionalLink>
            </Button>
            {/*<Button active={friendsActive}>
                <ConditionalLink active={friendsActive} to="/friends">
                    <IconButton>
                        <Inbox size={25} />
                    </IconButton>
                </ConditionalLink>
            </Button>*/}
            <Button active={settingsActive}>
                <ConditionalLink active={settingsActive} to="/settings">
                    <IconButton>
                        <UserIcon target={user} size={26} status={true} />
                    </IconButton>
                </ConditionalLink>
            </Button>
        </NavigationBase>
    );
}

export default connectState(BottomNavigation, (state) => {
    return {
        lastOpened: state.lastOpened,
    };
});
