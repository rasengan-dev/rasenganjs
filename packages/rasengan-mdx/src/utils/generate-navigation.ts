// @ts-ignore
import { RouterComponent } from 'rasengan';
import { NavigationStructure } from '../types/index.js';

export const generateNavigation = (router: RouterComponent) => {
  const navigation: NavigationStructure[] = [];

  const { routers: subRouters, pages } = router;

  for (const page of pages) {
    // if (page.metadata?.hidden) {
    //   continue;
    // }

    const { exists, isParent, route } = checkIfRouteExists(
      navigation,
      page.path
    );

    if (exists) {
      continue;
    }

    if (isParent) {
      route.children.push({
        title: page.metadata.title,
        link: page.path,
        level: route.level + 1,
      });

      continue;
    }

    navigation.push({
      title: page.metadata.title,
      link: page.path,
      level: 1,
      children: [],
    });
  }

  // for (const subRouter of subRouters) {
  //   navigation.push({
  //     title: subRouter.layout.title,
  //     link: subRouter.layout.path,
  //     level: 1,
  //     children: generateNavigation(subRouter),
  //   });
  // }

  return navigation;
};

const checkIfRouteExists = (
  navigation: NavigationStructure[],
  path: string
) => {
  for (const route of navigation) {
    if (route.link === path) {
      return {
        exists: true,
        isParent: false,
        route,
      };
    }

    if (path.startsWith(route.link)) {
      return {
        exists: false,
        isParent: true,
        route,
      };
    }

    if (route.children) {
      const result = checkIfRouteExists(route.children, path);

      if (result.exists) {
        return result;
      }
    }
  }

  return {
    exists: false,
    isParent: false,
    route: null,
  };
};
