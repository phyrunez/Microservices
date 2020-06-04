import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from "@vcticketing/common";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
