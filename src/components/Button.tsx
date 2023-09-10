// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import create from "../../actions/create";

// export default function Button() {
//   const queryClient = useQueryClient();
//   const { mutate } = useMutation({
//     mutationFn: create,
//     onSuccess: (newPost) => {
//       // ✅ update detail view directly
//       queryClient.invalidateQueries();
//     },
//   });

//   const click = () => {
//     mutate();
//   };

//   return (
//     <form action={click}>
//       <button type="submit">click</button>;
//     </form>
//   );
// }
