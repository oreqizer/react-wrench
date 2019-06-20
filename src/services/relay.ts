/* eslint-disable import/prefer-default-export */
import { commitMutation as relayCommitMutation } from "react-relay";
import { Environment, PayloadError, MutationConfig, OperationBase } from "relay-runtime";

type Excluded = "onCompleted" | "onError";

export const commitMutation = <R extends OperationBase>(
  environment: Environment,
  config: Omit<MutationConfig<R>, Excluded>,
) =>
  new Promise<R>((resolve, reject) => {
    relayCommitMutation(environment, {
      ...config,
      onCompleted: (response: R, errors?: PayloadError[] | null) => {
        if (errors) {
          reject(new Error(errors.map(e => e.message).join(", ")));
          return;
        }

        resolve(response);
      },
      onError: reject,
    });
  });
