from wordcloud import WordCloud
import matplotlib.pyplot as plt
import io
import base64


def create_wordcloud(text):
    wordcloud = WordCloud(
        stopwords=set(),
        background_color='white',
        random_state=42
    ).generate_from_frequencies(text)

    # Display the generated image:
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis("off")

    bio = io.BytesIO()
    plt.savefig(bio, format='jpg')
    bio.seek(0)
    return base64.b64encode(bio.read())
