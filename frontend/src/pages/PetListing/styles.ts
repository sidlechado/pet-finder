import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    margin-bottom: 10px;

    > div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;


export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Pet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 16px 24px;
    margin-bottom: 10px;
    border-radius: 10px;

    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`;
