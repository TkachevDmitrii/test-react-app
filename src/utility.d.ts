type GenericComponentProps<Component extends React.ElementType>
  = Omit<React.ComponentProps<Component>, 'component'>
  & { component?: Component }
