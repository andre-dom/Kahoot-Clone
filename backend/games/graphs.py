from io import BytesIO
import base64
import matplotlib
import matplotlib.pyplot as plt
import numpy as np


# take in a list of scores, return a histogram encoded in base64
def generate_score_histogram(data, maxScore):
    matplotlib.use('agg')
    plt.clf()
    bins = np.arange(maxScore + 2) - 0.5
    plt.hist(data, facecolor='#4582ec', edgecolor="#343a40", bins=bins)
    plt.ylabel('Players')
    plt.xlabel('Score')
    plt.tight_layout()
    plt.locator_params(axis="both", integer=True, tight=True)
    plt.xticks(np.arange(0, max(data) + 1, 1.0))

    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    buffer.close()

    graphic = base64.b64encode(image_png)
    graphic = graphic.decode('utf-8')

    return graphic