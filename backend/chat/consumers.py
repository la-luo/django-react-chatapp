import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = 'chatroom1'
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'id': text_data_json['id'],
                'body': text_data_json['body'],
                'user': text_data_json['user'],
                'created_at': text_data_json['created_at']
            }
        )

    # Receive message from room group
    def chat_message(self, event):

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'body': event['body'],
            'user': event['user'],
            'id': event['id'],
            'created_at': event['created_at']
        }))
