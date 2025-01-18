import styled from "styled-components";
import palette from "../../lib/palette";

const LoginRoot = styled.div`
  flex-direction: column;
  display: flex;
`;
const AboutContainer = styled.div`
    // font-weight: 200;
    color: ${palette.warm.primary.hex};
    padding: 1rem 0;
    margin-top: 1rem;
    & ul {
      padding-top: 1rem;
      & li {
        list-style-position: inside;
        color: ${palette.warm.secondary.hex};
        line-height: 1.4rem;
        font-size: .9rem;
      },
    },
`;

export { AboutContainer, LoginRoot };
