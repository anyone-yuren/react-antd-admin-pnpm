import { createStyles } from 'antd-style';

export default createStyles(({ token, css }) => {
  return {
    gCardGroup: css`
      margin: 0;
      margin-top: -8px;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;

      &-option {
        padding: 8px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        margin-right: 8px;
        margin-top: 8px;
        background-color: #fff;
        cursor: pointer;
        float: left;
        display: flex;
        position: relative;
        transition: 200ms;
        max-width: 300px;

        &:hover:not(.g-card-group-option-disabled) {
          border-color: ${token.colorPrimary};
        }

        &-disabled {
          background-color: ${token.colorBgContainer};
          border-color: var(--ay-border-color);
          cursor: not-allowed;
          color: ${token.colorTextDisabled};

          .g-card-group {
            &-desc {
              color: ${token.colorTextDisabled};
            }

            &-cover {
              opacity: 0.3;
            }
          }
        }

        &-active {
          background-color: ${token.colorPrimaryHover};
          border-color: ${token.colorPrimaryBorder};
          color: ${token.colorTextLightSolid};
        }

        &-has-desc {
          .g-card-group {
            &-info {
              display: block;
            }

            &-large {
              .g-card-group-title {
                font-weight: 500;
              }
            }
          }
        }
      }

      &-cover {
        flex-shrink: 0;
        height: 100%;
        margin-right: 8px;
        user-select: none;

        &.g-card-group {
          &-no-info {
            margin-right: 0;
          }
        }
      }

      &-title {
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &-desc {
        color: var(--ay-sub-color);
        font-size: 12px;
      }

      &-readonly {
        .g-card-group-option {
          cursor: unset;

          &:hover {
            border-color: ${token.colorBorder};
          }

          &-active {
            &:hover {
              border-color: ${token.colorPrimary};
              background-color: ${token.colorPrimary};
            }
          }
        }
      }

      &-multiple {
        .g-card-group-option-active {
          &::after {
            content: '';
            top: 2px;
            right: 2px;
            width: 10px;
            height: 10px;
            border: 5px solid ${token.colorPrimary};
            border-left: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-top-right-radius: 2px;
            position: absolute;
          }
        }
      }

      &-info {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
      }

      &-large {
        margin-top: -16px;

        .g-card-group {
          &-option {
            width: 300px;
            padding: 12px 16px;
            margin-right: 16px;
            margin-top: 16px;
          }

          &-cover {
            width: 48px;
            height: 48px;
          }

          &-desc {
            font-size: 14px;
          }
        }
      }
    `,
  };
});
