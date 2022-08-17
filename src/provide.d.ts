// react
declare const React: typeof import('react')
declare const useState: typeof import('react').useState
declare const useMemo: typeof import('react').useMemo
declare const useCallback: typeof import('react').useCallback
declare const useEffect: typeof import('react').useEffect
declare const useLayoutEffect: typeof import('react').useLayoutEffect
declare const useRef: typeof import('react').useRef
declare const useContext: typeof import('react').useContext

type ReactNode = import('react').ReactNode;
type ReactChild = import('react').ReactChild;
type ReactElement<
  P = any,
  T extends string | React.JSXElementConstructor<any> = string | React.JSXElementConstructor<any>
> = import('react').ReactElement<P, T>;
type FunctionComponent<P = {}> = import('react').FunctionComponent<P>;

// react-query
declare const useQuery: typeof import('react-query').useQuery
declare const useMutation: typeof import('react-query').useMutation

// react-router
declare const usePathParams: typeof import('react-router').useParams

declare const styled: typeof import('styled-components').default
declare const http: typeof import('./http').http
declare const notify: typeof import('antd/lib/notification').default

type ListPageParams = PageParams & SearchTextParams & OrderParams
