import { Form, ActionPanel, Action, showToast, getPreferenceValues, popToRoot, ToastStyle, Toast } from "@raycast/api";
import axios from "axios";
const preference = getPreferenceValues<{ accessToken: string; channelName: string }>();

type Values = {
  message: string;
};

export default function Command() {
  async function handleSubmit(values: Values) {
    const url = "https://slack.com/api/chat.postMessage";

    const result = await axios.request({
      headers: {
        authorization: `Bearer ${preference.accessToken}`,
      },
      url,
      method: "POST",
      data: {
        channel: preference.channelName,
        text: values.message,
      },
    });

    console.log(result.data);

    if (result.data.ok) {
      await showToast(Toast.Style.Success, "メッセージを送信しました。");
      popToRoot();
    } else {
      await showToast(Toast.Style.Failure, "メッセージの送信に失敗しました。");
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="This form showcases all available form elements." />
      <Form.TextArea id="message" title="Text area" placeholder="Enter multi-line text" />
    </Form>
  );
}
