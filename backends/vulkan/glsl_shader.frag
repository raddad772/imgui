#version 450 core
layout(location = 0) out vec4 fColor;

layout(set=0, binding=0) uniform sampler2D sTexture;

layout(push_constant) uniform uPushConstant {
    layout(offset = 16) float PerceptualExponent;
} pc;

layout(location = 0) in struct {
    vec4 Color;
    vec2 UV;
} In;

void main()
{
    vec4 color = In.Color * texture(sTexture, In.UV.st);
    if (pc.PerceptualExponent != 1.0)
        color.rgb = pow(max(color.rgb, vec3(0.0)), vec3(pc.PerceptualExponent));
    fColor = color;
}
