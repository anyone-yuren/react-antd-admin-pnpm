import { CloseOutlined, LeftOutlined, RedoOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import classNames from 'classnames';
import { type FC, useEffect, useRef, useState, type WheelEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { searchRoute } from '@/utils';

import { basicRoutes } from '@/router';
import { useAppDispatch, useAppSelector } from '@/stores';
import { addVisitedTags, closeAllTags, closeTagByKey, closeTagsByType, updateVisitedTags } from '@/stores/modules/tags';

import { TagItem } from './components';
import useStyles from './index.module.style';

import type { RouteObject } from '@/router/types';
import type { MenuProps } from 'antd';

const LayoutTags: FC = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const items: MenuProps['items'] = [
    { key: 'left', label: t('关闭左侧') },
    { key: 'right', label: t('关闭右侧') },
    { key: 'other', label: t('关闭其它') },
    { key: 'all', label: t('关闭所有') },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'all') {
      // @ts-ignore
      dispatch(closeAllTags()).then(({ payload }) => {
        const lastTag = payload.slice(-1)[0];
        if (activeTag !== lastTag?.fullPath) {
          navigate(lastTag?.fullPath);
        }
      });
    } else {
      dispatch(closeTagsByType({ type: key, path: activeTag }));
    }
  };

  const tagsMain = useRef<ElRef>(null);
  const tagsMainBody = useRef<ElRef>(null);

  const [tagsBodyLeft, setTagsBodyLeft] = useState(0);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const visitedTags = useAppSelector((state) => state.tags.visitedTags);
  const dispatch = useAppDispatch();

  const [activeTag, setActiveTag] = useState(pathname);

  useEffect(() => {
    const affixTags = initAffixTags(basicRoutes);
    affixTags.forEach((tag) => {
      dispatch(addVisitedTags(tag));
    });
  }, []);

  useEffect(() => {
    const currRoute = searchRoute(pathname, basicRoutes);
    if (currRoute) {
      dispatch(addVisitedTags(currRoute));
    }
    setActiveTag(pathname);
  }, [pathname]);

  useEffect(() => {
    const tagNodeList = tagsMainBody.current?.childNodes as unknown as Array<HTMLElement>;
    const activeTagNode = Array.from(tagNodeList).find((item) => item.dataset.path === activeTag)!;
    moveToActiveTag(activeTagNode);
  }, [activeTag]);

  const initAffixTags = (routes: RouteObject[], basePath: string = '/') => {
    const affixTags: RouteObject[] = [];

    const processRoute = (route: RouteObject) => {
      if (route.meta?.affix) {
        const fullPath = route.path!.startsWith('/') ? route.path : basePath + route.path;
        affixTags.push({
          ...route,
          path: fullPath,
        });
      }
      if (route.children && route.children.length) {
        route.children.forEach((child) => processRoute(child));
      }
    };

    routes.forEach((route) => processRoute(route));

    return affixTags;
  };

  const moveToActiveTag = (tag: any) => {
    let leftOffset: number = 0;
    const mainBodyPadding = 4;
    const mainWidth = tagsMain.current?.offsetWidth!;
    const mainBodyWidth = tagsMainBody.current?.offsetWidth!;
    if (mainBodyWidth < mainWidth) {
      leftOffset = 0;
    } else if ((tag?.offsetLeft ?? 0) < -tagsBodyLeft) {
      // 标签在可视区域左侧 (The active tag on the left side of the layout_tags-main)
      leftOffset = (tag?.offsetLeft ?? 0) + mainBodyPadding;
    } else if (
      (tag?.offsetLeft ?? 0) > -tagsBodyLeft &&
      (tag?.offsetLeft ?? 0) + (tag?.offsetWidth ?? 0) < -tagsBodyLeft + mainWidth
    ) {
      // 标签在可视区域 (The active tag on the layout_tags-main)
      leftOffset = Math.min(0, mainWidth - (tag?.offsetWidth ?? 0) - (tag?.offsetLeft ?? 0) - mainBodyPadding);
    } else {
      // 标签在可视区域右侧 (The active tag on the right side of the layout_tags-main)
      leftOffset = -((tag?.offsetLeft ?? 0) - (mainWidth - mainBodyPadding - (tag?.offsetWidth ?? 0)));
    }
    setTagsBodyLeft(leftOffset);
  };

  const handleMove = (offset: number) => {
    let leftOffset: number = 0;
    const mainWidth = tagsMain.current?.offsetWidth!;
    const mainBodyWidth = tagsMainBody.current?.offsetWidth!;

    if (offset > 0) {
      leftOffset = Math.min(0, tagsBodyLeft + offset);
    } else if (mainWidth < mainBodyWidth) {
      if (tagsBodyLeft >= -(mainBodyWidth - mainWidth)) {
        leftOffset = Math.max(tagsBodyLeft + offset, mainWidth - mainBodyWidth);
      }
    } else {
      leftOffset = 0;
    }
    setTagsBodyLeft(leftOffset);
  };

  const handleScroll = (e: WheelEvent) => {
    const { type } = e;
    let distance: number = 0;

    if (type === 'wheel') {
      distance = e.deltaY ? e.deltaY * 2 : -(e.detail || 0) * 2;
    }

    handleMove(distance);
  };

  const handleCloseTag = (path: string) => {
    // @ts-ignore
    dispatch(closeTagByKey(path)).then(({ payload }) => {
      let currTag: RouteObject = {};
      const { tagIndex, tagsList } = payload;
      const tagLen = tagsList.length;
      if (path === activeTag) {
        if (tagIndex <= tagLen - 1) {
          currTag = tagsList[tagIndex];
        } else {
          currTag = tagsList[tagLen - 1];
        }
        navigate(currTag?.fullPath!);
      }
    });
  };

  const handleClickTag = (path: string) => {
    setActiveTag(path);
    navigate(path);
  };

  function getKey() {
    return new Date().getTime().toString();
  }
  const handleReload = () => {
    // 刷新当前路由，页面不刷新
    const index = visitedTags.findIndex((tab) => tab.fullPath === activeTag);
    if (index >= 0) {
      // 这个是react的特性，key变了，组件会卸载重新渲染
      navigate(activeTag, { replace: true, state: { key: getKey() } });
    }
  };

  return (
    <div className={styles.layout_tags}>
      <Button
        className={`${styles.layout_tags}__btn`}
        icon={<LeftOutlined />}
        size='small'
        onClick={() => handleMove(200)}
      />

      <div ref={tagsMain} className={`${styles.layout_tags}__main`} onWheel={handleScroll}>
        <div ref={tagsMainBody} className={`${styles.layout_tags}__main-body`} style={{ left: `${tagsBodyLeft}px` }}>
          {visitedTags.map((item: RouteObject) => (
            <span key={item.fullPath} data-path={item.fullPath}>
              <TagItem
                key={item.key}
                name={t(item.meta?.title!)}
                active={activeTag === item.fullPath}
                fixed={item.meta?.affix}
                onClick={() => handleClickTag(item.fullPath!)}
                closeTag={() => handleCloseTag(item.fullPath!)}
              />
            </span>
          ))}
        </div>
      </div>
      <Button
        className={`${styles.layout_tags}__btn`}
        icon={<RightOutlined />}
        size='small'
        onClick={() => handleMove(-200)}
      />

      <Button
        className={classNames(`${styles.layout_tags}__btn`, `${styles.layout_tags}__btn-space`)}
        icon={<RedoOutlined />}
        size='small'
        onClick={() => handleReload()}
      />

      <Dropdown menu={{ items, onClick }} placement='bottomLeft'>
        <Button
          className={classNames(`${styles.layout_tags}__btn`, `${styles.layout_tags}__btn-space`)}
          icon={<CloseOutlined />}
          size='small'
        />
      </Dropdown>
    </div>
  );
};

export default LayoutTags;
