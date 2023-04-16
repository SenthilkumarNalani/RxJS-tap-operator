import { of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
// The tap() operator:
// The 'tap' operator works like a spy and allows us to cause some side effects without interacting with the notifications.
// It is useful if we have multiple operators stacked and we would like to be able to observe the notifications at any stage of this operator's pipeline to, for example, console log something to have feedback what's happening there.
// As We've said, it doesn't influence the notifications in any way. So, all notifications(next/data, error and complete) will be reemitted to the output in an unchanged form. It will just allow us to run some side effects for each notification.
// In the coding section, we'll use the 'tap' operator to watch what's happening at every stage of our pipeline of operators.
// This is useful for debugging when you have a few operators stacked and you'd like to see what values are emitted somewhere in the middle.

// Note: we can see that all numbers were emitted immediately as separate next notifications by the 'of' creation function and then completes.
// of(1, 7, 3, 6, 2)
//   .pipe(
//     filter((value) => value > 5),
//     map((value) => value * 2)
//   )
//   .subscribe((value) => console.log('Output:', value));

// With such simple code, it's easy to track what happens, however, often the logic is harder to follow, especially when the sources are more complicated and the items, the emitted values come spread in time. In our case, let's pretend it's this very complicated case and we need to see what happens at each step of our stream in order to find the cause. So, we can use the 'tap' operator to spy on the values that are emitted at each point of the operators' pipeline.

// of(1, 7, 3, 6, 2)
//   .pipe(
//     filter((value) => value > 5),
//     tap((value) => console.log('Spy: ', value)),
//     map((value) => value * 2)
//   )
//   .subscribe((value) => console.log('Output:', value));

// As a side note, the argument which you provide to the 'tap' operator over here, works the same way as the one which you pass to the subscribe method, so you can use that full Observer object. And also provide side effects for complete or error notifications if you want.
// of(1, 7, 3, 6, 2)
//   .pipe(
//     filter((value) => value > 5),
//     tap({
//       next: (value) => console.log('Spy: ', value),
//       error: (error) => console.log(error),
//       complete: () => console.log('Spy: complete'),
//     }),
//     map((value) => value * 2)
//   )
//   .subscribe((value) => console.log('Output:', value));

// Note: So, another important thing to remember is that using 'tap' won't execute the Observable. Even if you place it at the end, like so. It will just add a side effect.
// You still need to subscribe at the end to make everything work.
// So if I would remove this subscribe call and save.You can see that nothing is happening.
of(1, 7, 3, 6, 2).pipe(
  filter((value) => value > 5),
  tap({
    next: (value) => console.log('Spy: ', value),
    error: (error) => console.log(error),
    complete: () => console.log('Spy: complete'),
  }),
  map((value) => value * 2)
);

// Note: more on tap operator: https://jaywoz.medium.com/information-is-king-tap-how-to-console-log-in-rxjs-7fc09db0ad5a
