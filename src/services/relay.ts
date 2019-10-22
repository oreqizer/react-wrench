/* eslint-disable import/prefer-default-export */
import { commitMutation as relayCommitMutation } from "react-relay";
import { Environment, PayloadError, MutationConfig, MutationParameters } from "relay-runtime";

type Excluded = "onCompleted" | "onError";

export const commitMutation = <R extends MutationParameters>(
  environment: Environment,
  config: Omit<MutationConfig<R>, Excluded>,
) =>
  new Promise<R["response"]>((resolve, reject) => {
    relayCommitMutation(environment, {
      ...config,
      onCompleted: (response: R["response"], errors?: readonly PayloadError[] | null) => {
        if (errors) {
          reject(new Error(errors.map(e => e.message).join(", ")));
          return;
        }

        resolve(response);
      },
      onError: reject,
    });
  });
