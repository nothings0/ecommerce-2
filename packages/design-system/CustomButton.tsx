// import  from "ui";
// import {
//   Button,
//   createPolymorphicComponent,
//   ButtonProps,
//   rem,
// } from "@mantine/core";

// interface IButtonProps extends ButtonProps {
//   children: React.ReactNode;
// }

// const _Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
//   ({ children, ...props }, ref) => (
//     <Button
//       {...props}
//       ref={ref}
//       styles={(theme) => ({
//         root: {
//           backgroundColor: "#c94439",
//           border: 0,
//           height: rem(42),
//           paddingLeft: rem(20),
//           paddingRight: rem(20),
//           marginTop: rem(40),
//           "&:not([data-disabled])": theme.fn.hover({
//             backgroundColor: theme.fn.darken("#c94439", 0.05),
//           }),
//         },
//       })}
//     >
//       {children}
//     </Button>
//   )
// );
// export const CustomButton = createPolymorphicComponent<"button", ButtonProps>(
//   _Button
// );
